"use client";

import { EmailIcon } from "@/assets/icons";
import { requestPasswordReset } from "@/lib/auth/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import InputGroup from "../../FormElements/InputGroup";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await requestPasswordReset({
        email: email,
        redirectTo: "/auth/reset-password",
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      setSuccess(true);
      toast.success("Password reset link sent to your email!");
    } catch (err: any) {
      setError(err.message || "An error occurred");
      toast.error(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <h3 className="mb-4 text-xl font-bold text-dark dark:text-white">Email Sent!</h3>
        <p className="mb-6 font-medium text-dark-4 dark:text-dark-6">
          Check your terminal or email inbox for the reset link.
        </p>
        <Link
          href="/auth/sign-in"
          className="hover:bg-opacity-90 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition"
        >
          Return to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="email"
        label="Email"
        className="mb-6 [&_input]:py-3.75"
        placeholder="Enter your email"
        name="email"
        handleChange={(e) => setEmail(e.target.value)}
        value={email}
        icon={<EmailIcon />}
        required
      />

      <div className="mb-4.5">
        <button
          type="submit"
          disabled={loading}
          className="hover:bg-opacity-90 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          Send Reset Link
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p>
          Remember your password?{" "}
          <Link href="/auth/sign-in" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>

      {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
    </form>
  );
}
