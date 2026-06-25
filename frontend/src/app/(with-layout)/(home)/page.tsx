"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import charts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function RecruiterDashboard() {
  // Chart configs
  const barChartOptions: any = {
    chart: { type: "bar", toolbar: { show: false } },
    colors: ["#3C50E0"],
    plotOptions: { bar: { borderRadius: 4, horizontal: false } },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Frontend Dev", "Backend Eng", "DevOps", "UI/UX", "Data Sci"] },
  };

  const donutChartOptions: any = {
    chart: { type: "donut" },
    labels: ["Python", "React", "AWS", "Docker", "Node.js"],
    colors: ["#3C50E0", "#80CAEE", "#10B981", "#FFA70B", "#D34053"],
    dataLabels: { enabled: false },
    legend: { position: "bottom" },
  };

  const lineChartOptions: any = {
    chart: { type: "area", toolbar: { show: false } },
    colors: ["#3C50E0"],
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [50, 100] } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
  };

  return (
    <>
      <Breadcrumb pageName="Recruiter Dashboard" />

      {/* Top Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="text-title-sm font-bold text-dark dark:text-white">1,245</h4>
          <span className="text-body-sm font-medium">Total Candidates</span>
        </div>
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="text-title-sm font-bold text-dark dark:text-white">32</h4>
          <span className="text-body-sm font-medium">Active Jobs</span>
        </div>
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="text-title-sm font-bold text-dark dark:text-white">82%</h4>
          <span className="text-body-sm font-medium">Avg Match Score</span>
        </div>
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="text-title-sm font-bold text-dark dark:text-white">Alex Johnson</h4>
          <span className="text-body-sm font-medium text-primary">Top Candidate (92%)</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* Candidates per Job Chart */}
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="mb-4 text-xl font-bold text-dark dark:text-white">Candidates per Job</h4>
          <div className="-ml-5">
            <ReactApexChart options={barChartOptions} series={[{ name: "Candidates", data: [44, 55, 41, 67, 22] }]} type="bar" height={300} />
          </div>
        </div>

        {/* Skills Distribution Chart */}
        <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h4 className="mb-4 text-xl font-bold text-dark dark:text-white">Top Skills Distribution</h4>
          <div className="flex justify-center">
            <ReactApexChart options={donutChartOptions} series={[44, 55, 41, 17, 15]} type="donut" height={300} />
          </div>
        </div>

        {/* Monthly Applications Chart */}
        <div className="col-span-1 rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card md:col-span-2">
          <h4 className="mb-4 text-xl font-bold text-dark dark:text-white">Monthly Applications</h4>
          <div className="-ml-5">
            <ReactApexChart options={lineChartOptions} series={[{ name: "Applications", data: [31, 40, 28, 51, 42, 109] }]} type="area" height={300} />
          </div>
        </div>
      </div>
    </>
  );
}
