"use client";

import { PasswordIcon } from "@/assets/icons";
import { resetPassword } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import InputGroup from "../../FormElements/InputGroup";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword({
        newPassword: password,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success("Password reset successful!");
      router.push("/auth/sign-in");
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
      toast.error(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="password"
        label="New Password"
        className="mb-4 [&_input]:py-3.75"
        placeholder="Enter your new password"
        name="password"
        handleChange={(e) => setPassword(e.target.value)}
        value={password}
        icon={<PasswordIcon />}
        required
      />

      <InputGroup
        type="password"
        label="Confirm Password"
        className="mb-6 [&_input]:py-3.75"
        placeholder="Confirm your new password"
        name="confirmPassword"
        handleChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        icon={<PasswordIcon />}
        required
      />

      <div className="mb-4.5">
        <button
          type="submit"
          disabled={loading}
          className="hover:bg-opacity-90 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          Reset Password
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>

      <div className="mt-6 text-center">
        <p>
          <Link href="/auth/sign-in" className="text-primary hover:underline">
            Return to Sign In
          </Link>
        </p>
      </div>

      {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
    </form>
  );
}
