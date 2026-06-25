import Signup from "@/components/Auth/Signup";
import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import InteractivePanel from "@/components/Auth/InteractivePanel";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-wrap items-center">
      <div className="w-full xl:w-1/2">
        <div className="mx-auto w-[570px] p-4 sm:p-12.5 xl:p-15">
          <Signup />
        </div>
      </div>

      <div className="hidden w-full p-6 xl:block xl:w-1/2">
        <div className="bg-gray-100 dark:bg-dark-2 overflow-hidden rounded-2xl px-15 pt-12.5">
          <Link className="mb-10 inline-block" href="/">
            <Logo />
          </Link>
          <p className="mb-3 text-xl font-medium text-dark dark:text-white">
            Create your account
          </p>

          <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
            Start your journey
          </h1>

          <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
            Create an account with email and password to begin.
          </p>

          <InteractivePanel />
        </div>
      </div>
    </div>
  );
}
