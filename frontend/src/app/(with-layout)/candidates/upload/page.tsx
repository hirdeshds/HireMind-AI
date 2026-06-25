"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useState } from "react";
import { toast } from "sonner";

export default function UploadResumePage() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    // Mock upload & process
    setTimeout(() => {
      setIsUploading(false);
      setFiles([]);
      toast.success(`${files.length} resume(s) uploaded and processed successfully! AI extraction complete.`);
    }, 2500);
  };

  return (
    <>
      <Breadcrumb pageName="Upload Resumes" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Upload & Parse
              </h3>
            </div>
            
            <div className="p-6.5">
              <div
                className={`relative mb-5.5 block w-full appearance-none rounded border-2 border-dashed ${isDragging ? 'border-primary bg-primary/5' : 'border-stroke dark:border-dark-3'} bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </span>
                  <p className="text-body-sm font-medium">
                    <span className="text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-body-xs">PDF, DOCX (Max 5MB each)</p>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mb-5.5">
                  <h4 className="mb-2 text-sm font-medium text-dark dark:text-white">Selected Files:</h4>
                  <ul className="space-y-2">
                    {files.map((f, i) => (
                      <li key={i} className="flex items-center justify-between rounded bg-gray-2 px-3 py-2 text-sm dark:bg-meta-4">
                        <span className="truncate">{f.name}</span>
                        <span className="text-xs text-body">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={isUploading || files.length === 0}
                className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading & Parsing (AI)..." : "Process Resumes"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <h3 className="font-medium text-dark dark:text-white">
                AI Processing Pipeline
              </h3>
            </div>
            <div className="p-6.5">
              <div className="relative border-l border-stroke dark:border-dark-3 ml-3 space-y-6">
                <div className="relative pl-6">
                  <span className="absolute left-[-11px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">1</span>
                  <h4 className="font-semibold text-dark dark:text-white">Text Extraction</h4>
                  <p className="text-sm text-body mt-1">Converts PDF/DOCX formats into raw text.</p>
                </div>
                <div className="relative pl-6">
                  <span className="absolute left-[-11px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">2</span>
                  <h4 className="font-semibold text-dark dark:text-white">NER Parsing</h4>
                  <p className="text-sm text-body mt-1">Extracts Contact Info, Education, Experience, and Certifications.</p>
                </div>
                <div className="relative pl-6">
                  <span className="absolute left-[-11px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">3</span>
                  <h4 className="font-semibold text-dark dark:text-white">Skill Embedding</h4>
                  <p className="text-sm text-body mt-1">Maps extracted skills into vector embeddings for semantic search.</p>
                </div>
                <div className="relative pl-6">
                  <span className="absolute left-[-11px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">4</span>
                  <h4 className="font-semibold text-dark dark:text-white">Similarity Scoring</h4>
                  <p className="text-sm text-body mt-1">Calculates Match Score against open job descriptions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
