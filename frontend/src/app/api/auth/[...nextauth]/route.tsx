import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const isDevelopmentMode =
  process.env.NODE_ENV === "development" &&
  (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET);

const providers = [];

if (isDevelopmentMode) {
  providers.push(
    CredentialsProvider({
      name: "Development Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "dev@example.com" },
        name: { label: "Name", type: "text", placeholder: "Dev User" },
      },
      async authorize(credentials) {
        return {
          id: "dev-user-" + Date.now(),
          name: credentials?.name || "Dev User",
          email: credentials?.email || "dev@example.com",
        };
      },
    })
  );
} else {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    );
  }

  // ✅ Always add credentials provider as fallback
  providers.push(
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        return {
          id: "user-" + Date.now(),
          name: credentials?.name || "User",
          email: credentials.email,
        };
      },
    })
  );
}

const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    async signIn({ user }) {
      if (isDevelopmentMode) {
        console.log("Development mode: Skipping user API call");
        return true;
      }

      try {
        await axios.post(`${BACKEND_URL}/api/users`, {
          name: user.name,
          email: user.email,
          services: [],
        });
        return true;
      } catch (err) {
        console.error("User not saved to DB", err);
        return true;
      }
    },
    async session({ session }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: "/api/auth/signin", // ✅ Redirect errors to signin instead of blank error page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };