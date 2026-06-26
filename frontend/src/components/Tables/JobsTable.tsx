"use client";

import React from "react";
import Link from "next/link";

type JobData = {
  id: string;
  title: string;
  location: string;
  salaryRange: string | null;
  status: string;
  _count?: { applications: number };
};

const JobsTable = ({ jobs }: { jobs: JobData[] }) => {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Active Jobs
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium text-dark dark:text-dark-6">Job Title</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium text-dark dark:text-dark-6">Location</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium text-dark dark:text-dark-6">Salary</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-dark dark:text-dark-6">Status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-dark dark:text-dark-6">Applicants</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-dark dark:text-dark-6">Actions</p>
        </div>
      </div>

      {jobs.length === 0 && (
        <div className="px-4 py-4.5 text-center text-sm text-dark-6">
          No jobs found. Create one to get started!
        </div>
      )}

      {jobs.map((job, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={job.id}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                <Link href={`/jobs/${job.id}`} className="hover:text-primary transition-colors">{job.title}</Link>
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {job.location}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {job.salaryRange || "Not specified"}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p
              className={`inline-flex rounded-full px-3 py-1 text-body-sm font-medium ${
                job.status === "OPEN"
                  ? "bg-[#219653]/[0.08] text-[#219653]"
                  : "bg-[#D34053]/[0.08] text-[#D34053]"
              }`}
            >
              {job.status}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {job._count?.applications || 0}
            </p>
          </div>
          <div className="col-span-1 flex items-center gap-2">
            <Link href={`/jobs/${job.id}`} className="text-primary text-sm hover:underline">
              Dashboard
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsTable;
