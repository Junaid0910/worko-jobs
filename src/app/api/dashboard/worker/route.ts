import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    if (!userEmail) return NextResponse.json({ error: "No user email" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        worker: {
          include: {
            applications: {
              include: {
                job: {
                  include: {
                    hirer: {
                      include: {
                        user: true
                      }
                    }
                  }
                }
              },
              orderBy: {
                createdAt: 'desc'
              }
            }
          }
        }
      }
    });

    if (!user || !user.worker) {
      return NextResponse.json({ error: "Worker profile not found" }, { status: 404 });
    }

    return NextResponse.json({
      worker: user.worker,
      user: {
        name: user.name,
        city: user.city,
      }
    });

  } catch (error: any) {
    console.error("Dashboard fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
