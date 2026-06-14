// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Since we're using JWT session, we might need to get the user ID from the database using email
    // or from session if available. The session might not have the ID directly if not configured properly.
    // Let's fetch the user by email to be safe.
    const userEmail = session.user.email;
    if (!userEmail) {
       return NextResponse.json({ error: "No email associated with session" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) {
       return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = await req.json();
    const { role, name, city, trade } = data;

    if (!role || !name || !city) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Update User Profile
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        city,
        role: role,
      },
    });

    // 2. Create Specific Profile
    if (role === "WORKER") {
      // Check if worker profile already exists
      const existingWorker = await prisma.worker.findUnique({ where: { userId: user.id } });
      if (!existingWorker) {
        await prisma.worker.create({
          data: {
            userId: user.id,
            trade: trade || "OTHER",
            experience: 0,
            dailyWage: 500, // Default wage
            isAvailable: true,
            isVerified: false,
          },
        });
      }
    } else if (role === "HIRER") {
      const existingHirer = await prisma.hirer.findUnique({ where: { userId: user.id } });
      if (!existingHirer) {
        await prisma.hirer.create({
          data: {
            userId: user.id,
            type: "HOMEOWNER",
          },
        });
      }
    }

    return NextResponse.json({ success: true, redirect: role === "WORKER" ? "/dashboard/worker" : "/dashboard/hirer" });
  } catch (error: any) {
    console.error("Onboarding Error:", error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
