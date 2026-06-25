"use client";

import { EmailIcon, PasswordIcon } from "@/assets/icons";
import { signUp } from "@/lib/auth/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import InputGroup from "../FormElements/InputGroup";

export default function SignupWithPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "RECRUITER",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const callbackURL = searchParams.get("callbackUrl") || "/";

      await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        callbackURL,
      });
      router.push(callbackURL);
      toast.success("Sign up successful");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
      toast.error(
        `Error: ${err instanceof Error ? err.message : (err as { error?: { message?: string } }).error?.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="text"
        label="Name"
        className="mb-4 [&_input]:py-3.75"
        placeholder="Enter your name"
        name="name"
        handleChange={handleChange}
        value={data.name}
      />

      <InputGroup
        type="email"
        label="Email"
        className="mb-4 [&_input]:py-3.75"
        placeholder="Enter your email"
        name="email"
        handleChange={handleChange}
        value={data.email}
        icon={<EmailIcon />}
      />

      <InputGroup
        type="password"
        label="Password"
        className="mb-4 [&_input]:py-3.75"
        placeholder="Create a password"
        name="password"
        handleChange={handleChange}
        value={data.password}
        icon={<PasswordIcon />}
      />

      <div className="mb-5">
        <label className="mb-2.5 block font-medium text-dark dark:text-white">
          Account Role
        </label>
        <div className="relative">
          <select
            name="role"
            value={data.role}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-3.5 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
          >
            <option value="RECRUITER">Recruiter</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          disabled={loading}
          className="hover:bg-opacity-90 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          Sign Up
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
