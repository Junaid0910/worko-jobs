import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const trade = searchParams.get("trade");
  const city = searchParams.get("city");
  const isUrgent = searchParams.get("isUrgent") === "true";

  try {
    const where: any = { isActive: true };
    if (trade && trade !== "ALL") where.trade = trade;
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (isUrgent) where.isUrgent = true;

    const jobs = await prisma.job.findMany({
      where,
      include: { hirer: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const job = await prisma.job.create({
      data: {
        hirerId: data.hirerId,
        title: data.title,
        trade: data.trade,
        jobType: data.jobType,
        city: data.city,
        locality: data.locality,
        duration: data.duration,
        budgetPerDay: data.budgetPerDay,
        description: data.description,
        isUrgent: data.isUrgent || false,
        contactPref: data.contactPref,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      }
    });

    // In production, trigger Email notifications to nearby workers here
    /*
    const workers = await prisma.worker.findMany({ where: { trade: data.trade, user: { city: data.city } } });
    workers.forEach(worker => sendEmail(worker.user.email, "New Job Alert", ...));
    */

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to post job" }, { status: 500 });
  }
}
