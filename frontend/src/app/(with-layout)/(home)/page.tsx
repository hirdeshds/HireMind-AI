import { fetchCandidates } from "@/lib/api";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let candidates: any[] = [];
  try {
    candidates = await fetchCandidates();
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-dark dark:text-white">
          Candidate Dashboard
        </h2>
        <Link
          href="/add-candidate"
          className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Candidate
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {candidates.length === 0 ? (
          <div className="col-span-full rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <p className="text-center text-dark dark:text-white">No candidates found. Add one to get started!</p>
          </div>
        ) : (
          candidates.map((candidate: any) => (
            <div key={candidate.id} className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              <h3 className="mb-1 text-xl font-bold text-dark dark:text-white">
                {candidate.name}
              </h3>
              <p className="text-sm font-medium text-body-color dark:text-dark-6">
                {candidate.email}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {candidate.skills.map((skill: string, index: number) => (
                  <span key={index} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm font-medium text-body-color dark:text-dark-6">
                {candidate.experience_years} years experience
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
