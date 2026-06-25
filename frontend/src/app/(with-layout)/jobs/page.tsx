import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import JobsTable from "@/components/Tables/JobsTable";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jobs Management | HireMind-AI",
};

const JobsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Jobs" />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-dark dark:text-white">
          Manage Jobs
        </h2>
        <Link
          href="/jobs/create"
          className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Create New Job
        </Link>
      </div>

      <div className="space-y-10">
        <JobsTable />
      </div>
    </>
  );
};

export default JobsPage;
