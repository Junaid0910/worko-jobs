import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: jobId } = await params;
    
    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        hirer: {
          include: {
            user: true,
          }
        },
        applications: {
          include: {
            worker: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error: any) {
    console.error("Job fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: jobId } = await params;
    const data = await req.json();
    const { isActive } = data;

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { hirer: true }
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Verify ownership
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!user || job.hirer.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden. You do not own this job listing." }, { status: 403 });
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        isActive: isActive !== undefined ? isActive : job.isActive
      }
    });

    return NextResponse.json(updatedJob);
  } catch (error: any) {
    console.error("Job update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

