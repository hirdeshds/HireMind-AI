export const dynamic = 'force-dynamic';

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import { db } from "@/lib/db";
import { DashboardCharts } from "@/components/Charts/DashboardCharts";

export default async function RecruiterDashboard() {
  const totalCandidates = await db.candidate.count();
  const activeJobs = await db.job.count({ where: { status: 'OPEN' } });

  return (
    <>
      <Breadcrumb pageName="Recruiter Dashboard" />

      {/* Top Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="text-title-sm font-bold text-dark dark:text-white">{totalCandidates}</h4>
          <span className="text-body-sm font-medium">Total Candidates</span>
        </div>
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="text-title-sm font-bold text-dark dark:text-white">{activeJobs}</h4>
          <span className="text-body-sm font-medium">Active Jobs</span>
        </div>
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="text-title-sm font-bold text-dark dark:text-white">-</h4>
          <span className="text-body-sm font-medium">Avg Match Score</span>
        </div>
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="text-title-sm font-bold text-dark dark:text-white">-</h4>
          <span className="text-body-sm font-medium text-primary">Top Candidate</span>
        </div>
      </div>

      <DashboardCharts candidatesPerJob={[]} topSkills={[]} monthlyApplications={[]} />
    </>
  );
}
