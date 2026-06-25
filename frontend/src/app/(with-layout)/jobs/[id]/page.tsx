"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Data
const candidateMatches = [
  { id: "c1", name: "Alex Johnson", score: "92%", status: "Shortlisted", matchColor: "text-green-500" },
  { id: "c2", name: "Sarah Williams", score: "89%", status: "Reviewing", matchColor: "text-green-500" },
  { id: "c3", name: "John Davis", score: "85%", status: "New", matchColor: "text-yellow-500" },
  { id: "c4", name: "Emily Brown", score: "72%", status: "Rejected", matchColor: "text-red-500" },
];

export default function JobDashboardPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <>
      <Breadcrumb pageName={`Job Dashboard - ID: ${id}`} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-sm font-bold text-dark dark:text-white">45</h4>
              <span className="text-body-sm font-medium">Total Applications</span>
            </div>
          </div>
        </div>

        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-sm font-bold text-dark dark:text-white">88%</h4>
              <span className="text-body-sm font-medium">Avg. Match Score</span>
            </div>
          </div>
        </div>

        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-sm font-bold text-dark dark:text-white">5</h4>       
              <span className="text-body-sm font-medium">Top Candidates (&gt;90%)</span>        
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="px-4 py-6 md:px-6 xl:px-9 flex justify-between items-center">
            <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
              Top Candidates for this Job
            </h4>
            <Link href="/candidates" className="text-primary hover:underline text-sm font-medium">View All</Link>
          </div>

          <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium text-dark dark:text-dark-6">Candidate Name</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium text-dark dark:text-dark-6">Match Score</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium text-dark dark:text-dark-6">Status</p>
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <p className="font-medium text-dark dark:text-dark-6">Profile</p>
            </div>
          </div>

          {candidateMatches.map((candidate, key) => (
            <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 md:px-6 2xl:px-7.5" key={key}>
              <div className="col-span-2 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">{candidate.name}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className={`text-body-sm font-bold ${candidate.matchColor}`}>
                  {candidate.score}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">{candidate.status}</p>
              </div>
              <div className="col-span-1 flex items-center justify-end gap-2">
                <Link href={`/candidates/${candidate.id}`} className="text-primary text-sm hover:underline">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
