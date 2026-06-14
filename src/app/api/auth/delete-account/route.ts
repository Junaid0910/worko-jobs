import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { worker: true, hirer: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete Worker Profile & related records
    if (user.worker) {
      // Delete worker applications
      await prisma.application.deleteMany({
        where: { workerId: user.worker.id }
      });
      // Delete worker reviews
      await prisma.review.deleteMany({
        where: { workerId: user.worker.id }
      });
      // Delete worker record
      await prisma.worker.delete({
        where: { id: user.worker.id }
      });
    }

    // Delete Hirer Profile & related records
    if (user.hirer) {
      const jobs = await prisma.job.findMany({
        where: { hirerId: user.hirer.id }
      });
      const jobIds = jobs.map(j => j.id);

      // Delete applications for those jobs
      await prisma.application.deleteMany({
        where: { jobId: { in: jobIds } }
      });
      // Delete jobs
      await prisma.job.deleteMany({
        where: { hirerId: user.hirer.id }
      });
      // Delete hirer record
      await prisma.hirer.delete({
        where: { id: user.hirer.id }
      });
    }

    // Delete reviews authored by the user
    await prisma.review.deleteMany({
      where: { authorId: user.id }
    });

    // Finally, delete the User record (Accounts and Sessions cascade delete)
    await prisma.user.delete({
      where: { id: user.id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete account error:", error);
    return NextResponse.json({ error: "Failed to delete account: " + error.message }, { status: 500 });
  }
}
