import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import axios from "axios";

// Development mode: Use mock auth if Google credentials are not provided
const isDevelopmentMode = process.env.NODE_ENV === 'development' && 
  (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET);

const authOptions: NextAuthOptions = {
  providers: isDevelopmentMode
    ? [
        // Mock provider for development without OAuth setup
        CredentialsProvider({
          name: 'Development Login',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "dev@example.com" },
            name: { label: "Name", type: "text", placeholder: "Dev User" }
          },
          async authorize(credentials) {
            // In development mode, accept any credentials
            return {
              id: 'dev-user-' + Date.now(),
              name: credentials?.name || 'Dev User',
              email: credentials?.email || 'dev@example.com',
            };
          },
        }),
      ]
    : [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      ],
  callbacks: {
    async signIn({ user }) {
      // Skip API call in development mode
      if (isDevelopmentMode) {
        console.log("Development mode: Skipping user API call");
        return true;
      }

      try {
        await axios.post("http://localhost:5000/api/users", {
          name: user.name,
          email: user.email,
          services: [],
        });
        return true;
      } catch (err) {
        console.error("User not saved to DB", err);
        // Allow sign-in even if API fails (you can change this behavior)
        return true;
      }
    },
    async session({ session }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };