import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "../db";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is not set.");
}

export const auth = betterAuth({
  appName: "HireMind AI",
  baseURL: process.env.BETTER_AUTH_URL!,

  user: {
    additionalFields: {
      phoneNumber: {
        type: "number",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "RECRUITER",
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8,
    sendResetPassword: async ({ user, url, token }, request) => {
      const { sendEmail } = await import("../email");
      await sendEmail(
        user.email,
        "Reset Your Password - HireMind AI",
        `<p>Hi ${user.name || "User"},</p>
         <p>You requested a password reset. Click the link below to reset your password:</p>
         <p><a href="${url}">${url}</a></p>
         <p>If you did not request this, please ignore this email.</p>`
      );
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  // plugins: [...authorizationPlugins],

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
      strategy: "compact",
    },
    deferSessionRefresh: true,
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,
  },

  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL!,
    process.env.BETTER_AUTH_URL!,
  ],
});
