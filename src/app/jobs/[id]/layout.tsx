import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        hirer: {
          include: {
            user: true
          }
        }
      }
    });

    if (!job) {
      return {
        title: "Job Details | Worko",
        description: "View job listing details on Worko.",
      };
    }

    const title = job.title;
    const trade = job.trade;
    const city = job.city;
    const budget = job.budgetPerDay;
    const jobType = job.jobType;

    return {
      title: `${title} | Hire ${trade} in ${city} | Worko`,
      description: `Apply for ${title} in ${city}. Budget: ₹${budget}/day. Job Type: ${jobType}. Read details and apply directly on Worko, India's skilled trades network.`,
      openGraph: {
        title: `${title} | Hire ${trade} in ${city} | Worko`,
        description: `Apply for ${title} in ${city}. Budget: ₹${budget}/day. Job Type: ${jobType}. Read details and apply directly on Worko.`,
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: "Job Details | Worko",
      description: "View active job listing details on Worko.",
    };
  }
}

export default function JobDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
