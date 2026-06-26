"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getJobs() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const jobs = await db.job.findMany({
      where: {
        recruiterId: session.user.id,
      },
      include: {
        _count: {
          select: { applications: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function createJob(data: {
  title: string;
  description: string;
  skillsRequired: string[];
  experienceLevel: string;
  location: string;
  salaryRange?: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const job = await db.job.create({
      data: {
        ...data,
        recruiterId: session.user.id,
      },
    });

    return { success: true, job };
  } catch (error: any) {
    console.error("Error creating job:", error);
    return { success: false, error: error.message };
  }
}
