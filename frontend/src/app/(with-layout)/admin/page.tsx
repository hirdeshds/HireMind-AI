import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import { db } from "@/lib/db";

export default async function AdminDashboardPage() {
  const recruiters = await db.user.findMany({
    where: { role: 'RECRUITER' },
  });
  
  const totalJobs = await db.job.count();
  const totalCandidates = await db.candidate.count();

  return (
    <>
      <Breadcrumb pageName="Admin Dashboard" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="text-title-sm font-bold text-dark dark:text-white">{recruiters.length}</h4>
          <span className="text-body-sm font-medium">Total Recruiters</span>
        </div>
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="text-title-sm font-bold text-dark dark:text-white">{totalJobs}</h4>
          <span className="text-body-sm font-medium">Total Jobs Created</span>
        </div>
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="text-title-sm font-bold text-dark dark:text-white">{totalCandidates}</h4>
          <span className="text-body-sm font-medium">Total Resumes Parsed</span>
        </div>
      </div>

      <div className="mt-8 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="px-4 py-6 md:px-6 xl:px-9 flex justify-between items-center">
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Manage Recruiters
          </h4>
          <button className="text-white bg-primary px-4 py-2 rounded-md hover:bg-opacity-90">Add Recruiter</button>
        </div>

        <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center"><p className="font-medium text-dark dark:text-dark-6">Name</p></div>
          <div className="col-span-1 flex items-center"><p className="font-medium text-dark dark:text-dark-6">Email</p></div>
          <div className="col-span-1 flex items-center"><p className="font-medium text-dark dark:text-dark-6">Joined</p></div>
          <div className="col-span-1 flex items-center justify-end"><p className="font-medium text-dark dark:text-dark-6">Actions</p></div>
        </div>

        {recruiters.length === 0 && (
           <div className="px-4 py-4.5 md:px-6 2xl:px-7.5 text-center text-body-sm text-dark-6">
             No recruiters found.
           </div>
        )}

        {recruiters.map((recruiter, key) => (
          <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-dark-3 md:px-6 2xl:px-7.5" key={key}>
            <div className="col-span-1 flex items-center"><p className="text-body-sm font-medium text-dark dark:text-white">{recruiter.name}</p></div>
            <div className="col-span-1 flex items-center"><p className="text-body-sm text-dark dark:text-dark-6">{recruiter.email}</p></div>
            <div className="col-span-1 flex items-center"><p className="text-body-sm text-dark dark:text-dark-6">{recruiter.createdAt.toLocaleDateString()}</p></div>
            <div className="col-span-1 flex items-center justify-end gap-3">
              <button className="text-primary hover:underline text-sm">Edit</button>
              <button className="text-red-500 hover:underline text-sm">Disable</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
