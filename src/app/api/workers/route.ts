import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const trade = searchParams.get("trade");
  const city = searchParams.get("city");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const where: any = {};
    if (trade && trade !== "ALL") where.trade = trade;
    if (city) where.user = { city: { contains: city, mode: 'insensitive' } };

    const workers = await prisma.worker.findMany({
      where,
      include: { user: true },
      skip,
      take: limit,
      orderBy: { rating: 'desc' },
    });

    const total = await prisma.worker.count({ where });

    return NextResponse.json({ 
      workers,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch workers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Validate data with Zod in production
    
    const worker = await prisma.worker.create({
      data: {
        userId: data.userId,
        trade: data.trade,
        experience: data.experience,
        dailyWage: data.dailyWage,
        bio: data.bio,
        languages: data.languages,
        profilePhoto: data.profilePhoto,
        itiCertificate: data.itiCertificate,
      }
    });

    return NextResponse.json(worker);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create worker profile" }, { status: 500 });
  }
}
