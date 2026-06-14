import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "Worker ID is required" }, { status: 400 });
    }

    const worker = await prisma.worker.findUnique({
      where: { id },
      include: {
        user: true,
        reviews: {
          include: {
            author: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!worker) {
      return NextResponse.json({ error: "Worker not found" }, { status: 404 });
    }

    return NextResponse.json(worker);
  } catch (error: any) {
    console.error("Worker fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
