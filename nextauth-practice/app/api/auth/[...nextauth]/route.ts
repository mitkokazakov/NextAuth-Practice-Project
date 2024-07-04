import NextAuth from "next-auth/next";
import prisma from "@/app/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { CredentialsProvider } from "next-auth/providers/credentials";
import { GoogleProfile } from "next-auth/providers/google";