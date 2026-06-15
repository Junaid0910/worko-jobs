import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const worker = await prisma.worker.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!worker) {
      return {
        title: "Worker Profile | Worko",
        description: "View verified worker details on Worko.",
      };
    }

    const name = worker.user?.name || "Skilled Pro";
    const trade = worker.trade === "OTHER" && worker.customTrade ? worker.customTrade : worker.trade;
    const city = worker.user?.city || "India";
    const exp = worker.experience ? `${worker.experience} Years Experience` : "Expert";
    const title = worker.title || `${trade} Expert`;

    return {
      title: `${name} | ${title} in ${city} | Worko`,
      description: `Hire ${name}, a professional ${trade} based in ${city} with ${exp}. View daily wages, ratings, skills, and direct contact details on Worko.`,
      openGraph: {
        title: `${name} | ${title} in ${city} | Worko`,
        description: `Hire ${name}, a professional ${trade} based in ${city} with ${exp}. View daily wages, ratings, skills, and contact details.`,
        type: "profile",
        images: worker.profilePhoto ? [{ url: worker.profilePhoto }] : [],
      },
    };
  } catch (error) {
    return {
      title: "Worker Profile | Worko",
      description: "View skilled worker profile details on Worko.",
    };
  }
}

export default function WorkerDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
