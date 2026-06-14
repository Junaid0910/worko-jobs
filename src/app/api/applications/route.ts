// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = (await getServerSession(authOptions)) as any;
    if (!session || !session.user) {
      return NextResponse.json({ error: "You must be logged in to apply." }, { status: 401 });
    }

    const { jobId } = await req.json();

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    // Get the user and ensure they are a worker
    const userEmail = session?.user?.email;
    if (!userEmail) return NextResponse.json({ error: "No user email" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { worker: true }
    });

    if (!user || !user.worker) {
      return NextResponse.json({ error: "Only verified workers can apply for jobs. Please complete your worker profile." }, { status: 403 });
    }

    // Check if already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId: jobId,
        workerId: user.worker.id,
      }
    });

    if (existingApplication) {
      return NextResponse.json({ error: "You have already applied for this job." }, { status: 400 });
    }

    // Create the application
    const application = await prisma.application.create({
      data: {
        jobId: jobId,
        workerId: user.worker.id,
        status: "PENDING",
      }
    });

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error("Application error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
