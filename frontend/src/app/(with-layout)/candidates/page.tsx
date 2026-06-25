"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useState } from "react";
import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";
import { Select } from "@/components/FormElements/select";

const allCandidates = [
  { id: "c1", name: "Alex Johnson", email: "alex@example.com", skills: ["Python", "AWS", "Docker"], score: "92%", experience: "5 Yrs", status: "Shortlisted" },
  { id: "c2", name: "Sarah Williams", email: "sarah@example.com", skills: ["Python", "FastAPI", "React"], score: "89%", experience: "4 Yrs", status: "Reviewing" },
  { id: "c3", name: "John Davis", email: "john@example.com", skills: ["JavaScript", "Node.js", "MongoDB"], score: "85%", experience: "3 Yrs", status: "New" },
  { id: "c4", name: "Emily Brown", email: "emily@example.com", skills: ["Java", "Spring Boot", "SQL"], score: "72%", experience: "2 Yrs", status: "Rejected" },
  { id: "c5", name: "Michael Lee", email: "michael@example.com", skills: ["Python", "Kubernetes", "Terraform"], score: "90%", experience: "6 Yrs", status: "New" },
];

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Breadcrumb pageName="Candidate Leaderboard" />

      {/* AI Semantic Search */}
      <div className="mb-6 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h3 className="mb-4 text-title-sm font-bold text-dark dark:text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          AI Semantic Search
        </h3>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="w-full sm:w-2/3">
            <InputGroup
              type="text"
              label=""
              placeholder="e.g. Python developer with AWS and FastAPI experience"
              value={searchQuery}
              handleChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex w-full sm:w-1/3 justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
            Search Candidates
          </button>
        </div>
        <p className="mt-2 text-sm text-body">Describe what you are looking for in natural language.</p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4 flex-wrap">
          <div className="w-40">
            <Select label="" items={[{label: "All Experience", value: "all"}, {label: "0-2 Years", value: "entry"}, {label: "3-5 Years", value: "mid"}, {label: "5+ Years", value: "senior"}]} defaultValue="all" />
          </div>
          <div className="w-40">
            <Select label="" items={[{label: "Any Score", value: "all"}, {label: "90%+", value: "90"}, {label: "80%+", value: "80"}]} defaultValue="all" />
          </div>
        </div>
        <Link
          href="/candidates/upload"
          className="inline-flex items-center justify-center rounded-md bg-secondary px-6 py-2.5 text-center font-medium text-white hover:bg-opacity-90"
        >
          Upload Resumes
        </Link>
      </div>

      {/* Candidates Table */}
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium text-dark dark:text-dark-6">Candidate</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium text-dark dark:text-dark-6">Top Skills</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium text-dark dark:text-dark-6">Experience</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium text-dark dark:text-dark-6">AI Score</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium text-dark dark:text-dark-6">Status</p>
          </div>
          <div className="col-span-1 flex items-center justify-end">
            <p className="font-medium text-dark dark:text-dark-6">Actions</p>
          </div>
        </div>

        {allCandidates.map((candidate, key) => (
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5" key={key}>
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-1">
                <Link href={`/candidates/${candidate.id}`} className="text-body-sm font-bold text-dark hover:text-primary dark:text-white transition-colors">
                  {candidate.name}
                </Link>
                <span className="text-xs text-body">{candidate.email}</span>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex gap-2 flex-wrap">
              {candidate.skills.map(skill => (
                <span key={skill} className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {skill}
                </span>
              ))}
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm text-dark dark:text-dark-6">{candidate.experience}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-bold text-green-500">{candidate.score}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm text-dark dark:text-dark-6">{candidate.status}</p>
            </div>
            <div className="col-span-1 flex items-center justify-end gap-2">
              <Link href={`/candidates/${candidate.id}`} className="text-primary text-sm hover:underline">
                Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
