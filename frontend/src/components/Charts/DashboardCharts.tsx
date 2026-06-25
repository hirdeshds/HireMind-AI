"use client";

import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function DashboardCharts({ candidatesPerJob, topSkills, monthlyApplications }: any) {
  const barChartOptions: any = {
    chart: { type: "bar", toolbar: { show: false } },
    colors: ["#3C50E0"],
    plotOptions: { bar: { borderRadius: 4, horizontal: false } },
    dataLabels: { enabled: false },
    xaxis: { categories: candidatesPerJob?.map((c: any) => c.title) || [] },
  };

  const donutChartOptions: any = {
    chart: { type: "donut" },
    labels: topSkills?.map((s: any) => s.name) || [],
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
    xaxis: { categories: monthlyApplications?.map((m: any) => m.month) || [] },
  };

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <h4 className="mb-4 text-xl font-bold text-dark dark:text-white">Candidates per Job</h4>
        <div className="-ml-5">
          <ReactApexChart options={barChartOptions} series={[{ name: "Candidates", data: candidatesPerJob?.map((c: any) => c.count) || [] }]} type="bar" height={300} />
        </div>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <h4 className="mb-4 text-xl font-bold text-dark dark:text-white">Top Skills Distribution</h4>
        <div className="flex justify-center">
          <ReactApexChart options={donutChartOptions} series={topSkills?.map((s: any) => s.count) || []} type="donut" height={300} />
        </div>
      </div>

      <div className="col-span-1 rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card md:col-span-2">
        <h4 className="mb-4 text-xl font-bold text-dark dark:text-white">Monthly Applications</h4>
        <div className="-ml-5">
          <ReactApexChart options={lineChartOptions} series={[{ name: "Applications", data: monthlyApplications?.map((m: any) => m.count) || [] }]} type="area" height={300} />
        </div>
      </div>
    </div>
  );
}
