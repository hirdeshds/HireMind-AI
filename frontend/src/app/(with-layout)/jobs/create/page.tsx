"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createJob } from "@/lib/actions/job.actions";

export default function CreateJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const skills = formData.get("skills")?.toString().split(",").map(s => s.trim()).filter(Boolean) || [];

    const result = await createJob({
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      skillsRequired: skills,
      experienceLevel: formData.get("experienceLevel")?.toString() || "",
      location: formData.get("location")?.toString() || "",
      salaryRange: formData.get("salaryRange")?.toString() || "",
    });

    setLoading(false);

    if (result.success) {
      toast.success("Job created successfully!");
      router.push("/jobs");
    } else {
      toast.error(result.error || "Failed to create job");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create Job" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Job Details
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <InputGroup
                    name="title"
                    label="Job Title"
                    placeholder="e.g. Senior Backend Engineer"
                    type="text"
                    required
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <Select
                      name="experienceLevel"
                      label="Experience Required"
                      items={[
                        { label: "Entry Level", value: "entry" },
                        { label: "Mid Level", value: "mid" },
                        { label: "Senior Level", value: "senior" },
                        { label: "Lead", value: "lead" },
                      ]}
                      defaultValue="mid"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <InputGroup
                      name="salaryRange"
                      label="Salary Range"
                      placeholder="e.g. $120k - $150k"
                      type="text"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <InputGroup
                    name="location"
                    label="Location"
                    placeholder="e.g. Remote, San Francisco"
                    type="text"
                    required
                  />
                </div>

                <div className="mb-4.5">
                  <InputGroup
                    name="skills"
                    label="Skills Required (comma separated)"
                    placeholder="e.g. Python, React, PostgreSQL"
                    type="text"
                    required
                  />
                  <p className="mt-2 text-xs text-body">Separate skills with a comma.</p>
                </div>

                <div className="mb-6">
                  <TextAreaGroup
                    name="description"
                    label="Job Description"
                    placeholder="Describe the job role, responsibilities, and requirements..."
                    rows={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 disabled:opacity-70"
                >
                  {loading ? "Creating..." : "Create Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Tips for a great job post
              </h3>
            </div>
            <div className="p-6.5">
              <ul className="list-inside list-disc space-y-3 text-dark-5 dark:text-dark-6">
                <li>Be specific about the required skills to improve AI matching accuracy.</li>
                <li>Clearly define the experience level needed.</li>
                <li>Include salary ranges to attract better candidates.</li>
                <li>Keep the description concise but informative.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
