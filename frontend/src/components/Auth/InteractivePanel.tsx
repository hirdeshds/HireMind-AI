"use client";

import React, { useState } from "react";

export default function InteractivePanel() {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="relative mt-20 flex h-[350px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-white/20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background glowing orb */}
      <div 
        className={`absolute h-48 w-48 rounded-full bg-primary/30 blur-3xl transition-all duration-700 ${hovered ? "scale-150 opacity-100" : "scale-100 opacity-60"}`}
      />
      <div 
        className={`absolute h-32 w-32 translate-x-12 translate-y-12 rounded-full bg-purple-500/30 blur-3xl transition-all duration-700 ${hovered ? "scale-150 opacity-100" : "scale-100 opacity-60"}`}
      />

      {/* Floating Elements */}
      <div className={`relative z-10 flex flex-col items-center gap-4 transition-transform duration-500 ${hovered ? "-translate-y-2" : ""}`}>
        <div className="flex items-center gap-3 rounded-lg border border-stroke bg-white dark:border-white/20 dark:bg-white/10 p-3 shadow-lg backdrop-blur-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-dark dark:text-white">Smart Parsing</p>
            <p className="text-xs text-dark-4 dark:text-white/70">100+ Resumes Processed</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 rounded-lg border border-stroke bg-white dark:border-white/20 dark:bg-white/10 p-3 shadow-lg backdrop-blur-md transition-all duration-700 ${hovered ? "translate-x-4" : "-translate-x-4"}`}>
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-dark dark:text-white">AI Match Score</p>
            <p className="text-xs text-dark-4 dark:text-white/70">92% Average Match</p>
          </div>
        </div>
      </div>
    </div>
  );
}
