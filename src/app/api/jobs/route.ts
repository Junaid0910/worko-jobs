import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const trade = searchParams.get("trade");
  const city = searchParams.get("city");
  const isUrgent = searchParams.get("isUrgent") === "true";
  const hirerId = searchParams.get("hirerId");
  const userId = searchParams.get("userId");

  try {
    const where: any = { isActive: true };
    if (trade && trade !== "ALL") where.trade = trade;
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (isUrgent) where.isUrgent = true;
    if (hirerId) where.hirerId = hirerId;
    if (userId) {
      where.hirer = { userId: userId };
    }

    const jobs = await prisma.job.findMany({
      where,
      include: { 
        hirer: { include: { user: true } },
        applications: true
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as any;
    const data = await req.json();
    
    const userId = (session?.user as any)?.id || data.userId;

    if (!userId) {
       return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const hirer = await prisma.hirer.upsert({
      where: { userId: userId },
      update: {},
      create: {
        userId: userId,
        type: "HOMEOWNER",
      }
    });

    await prisma.user.update({
       where: { id: userId },
       data: { role: "HIRER" }
    });

    const job = await prisma.job.create({
      data: {
        hirerId: hirer.id,
        title: data.title,
        trade: data.trade,
        jobType: data.jobType,
        city: data.city,
        locality: data.locality,
        duration: data.duration,
        budgetPerDay: parseInt(data.budgetPerDay),
        description: data.description,
        isUrgent: data.isUrgent || false,
        contactPref: "PHONE",
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      }
    });

    return NextResponse.json(job);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to post job: " + error.message }, { status: 500 });
  }
}
