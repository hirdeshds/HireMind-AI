"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useState } from "react";
import { useParams } from "next/navigation";

// Mock Data
const candidateData = {
  name: "Alex Johnson",
  title: "Senior Full Stack Engineer",
  email: "alex@example.com",
  phone: "+1 234 567 8900",
  overallScore: 89,
  scoreBreakdown: {
    skills: 92,
    experience: 85,
    education: 90,
    projects: 88,
  },
  skills: {
    matched: ["Python", "AWS", "Docker", "React", "TypeScript", "PostgreSQL"],
    missing: ["Kubernetes", "Terraform", "GraphQL"],
  },
  summary: "Candidate has 5 years of experience in Python, React, and AWS. Strong backend development background with significant cloud deployment expertise. They have scaled applications to 10k+ DAU.",
  interviewQuestions: [
    "1. Explain how you structure a scalable FastAPI application with dependency injection.",
    "2. How does Docker networking work in a multi-container environment?",
    "3. Can you explain the difference between ECS and EKS based on your AWS experience?"
  ],
  experience: [
    { role: "Senior Backend Engineer", company: "TechCorp Inc.", duration: "2021 - Present", desc: "Led the migration of monolith to microservices using Python and Docker." },
    { role: "Full Stack Developer", company: "WebSolutions", duration: "2018 - 2021", desc: "Developed responsive React frontends and integrated with Node.js APIs." }
  ],
  education: [
    { degree: "B.S. Computer Science", institution: "University of Technology", year: "2018" }
  ]
};

export default function CandidateProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <Breadcrumb pageName={`Candidate: ${candidateData.name}`} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left Column: AI Summary & Breakdown */}
        <div className="flex flex-col gap-6 xl:col-span-1">
          {/* Match Score Card */}
          <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <h3 className="mb-4 text-title-sm font-bold text-dark dark:text-white">AI Match Score</h3>
            
            <div className="mb-6 flex items-center justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-[10px] border-primary">
                <span className="text-3xl font-bold text-dark dark:text-white">{candidateData.overallScore}%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>Skills</span>
                  <span className="text-green-500">{candidateData.scoreBreakdown.skills}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-stroke dark:bg-dark-3">
                  <div className="h-full rounded-full bg-green-500" style={{ width: `${candidateData.scoreBreakdown.skills}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>Experience</span>
                  <span className="text-green-500">{candidateData.scoreBreakdown.experience}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-stroke dark:bg-dark-3">
                  <div className="h-full rounded-full bg-green-500" style={{ width: `${candidateData.scoreBreakdown.experience}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>Education</span>
                  <span className="text-green-500">{candidateData.scoreBreakdown.education}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-stroke dark:bg-dark-3">
                  <div className="h-full rounded-full bg-green-500" style={{ width: `${candidateData.scoreBreakdown.education}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <h3 className="mb-4 text-title-sm font-bold text-dark dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              AI Summary
            </h3>
            <p className="text-sm leading-relaxed text-body">{candidateData.summary}</p>
          </div>

          {/* AI Interview Questions */}
          <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <h3 className="mb-4 text-title-sm font-bold text-dark dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              Generated Interview Questions
            </h3>
            <ul className="space-y-3 text-sm text-body">
              {candidateData.interviewQuestions.map((q, idx) => (
                <li key={idx} className="p-3 rounded bg-gray-2 dark:bg-meta-4 border-l-2 border-primary">{q}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Detailed Profile */}
        <div className="flex flex-col gap-6 xl:col-span-2">
          {/* Header */}
          <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card flex justify-between items-center">
            <div>
              <h2 className="text-title-md2 font-bold text-dark dark:text-white">{candidateData.name}</h2>
              <p className="text-body font-medium">{candidateData.title}</p>
              <div className="mt-2 flex gap-4 text-sm text-body-sm">
                <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> {candidateData.email}</span>
                <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg> {candidateData.phone}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90">Shortlist</button>
              <button className="rounded border border-stroke px-6 py-2 font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-meta-4">Reject</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="flex border-b border-stroke px-6 dark:border-dark-3">
              <button 
                className={`py-4 px-4 font-medium ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-body hover:text-dark dark:hover:text-white'}`}
                onClick={() => setActiveTab('profile')}
              >
                Extracted Data
              </button>
              <button 
                className={`py-4 px-4 font-medium ${activeTab === 'resume' ? 'border-b-2 border-primary text-primary' : 'text-body hover:text-dark dark:hover:text-white'}`}
                onClick={() => setActiveTab('resume')}
              >
                Resume Preview
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'profile' ? (
                <div className="space-y-8">
                  {/* Skills Section */}
                  <div>
                    <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">Skills Gap Analysis</h4>
                    <div className="mb-4">
                      <p className="mb-2 text-sm font-medium text-dark dark:text-white">Matched Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {candidateData.skills.matched.map(skill => (
                          <span key={skill} className="rounded bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400">✓ {skill}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-dark dark:text-white">Missing Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {candidateData.skills.missing.map(skill => (
                          <span key={skill} className="rounded bg-red-500/10 px-3 py-1 text-sm font-medium text-red-600 dark:text-red-400">✗ {skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">Experience</h4>
                    <div className="space-y-4 border-l-2 border-stroke pl-4 dark:border-dark-3">
                      {candidateData.experience.map((exp, i) => (
                        <div key={i} className="relative">
                          <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-white dark:ring-gray-dark"></span>
                          <h5 className="font-semibold text-dark dark:text-white">{exp.role}</h5>
                          <p className="text-sm text-primary mb-1">{exp.company} • {exp.duration}</p>
                          <p className="text-sm text-body">{exp.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">Education</h4>
                    <div className="space-y-4">
                      {candidateData.education.map((edu, i) => (
                        <div key={i} className="rounded border border-stroke p-4 dark:border-dark-3 bg-gray-2 dark:bg-meta-4">
                          <h5 className="font-semibold text-dark dark:text-white">{edu.degree}</h5>
                          <p className="text-sm text-body">{edu.institution} • {edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-[600px] w-full items-center justify-center rounded bg-gray-2 dark:bg-meta-4">
                  <p className="text-body flex flex-col items-center">
                    <svg className="w-12 h-12 mb-3 text-body" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    PDF Viewer Component Here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
