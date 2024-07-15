import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import prisma from "@/app/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs'
import { revalidatePath } from "next/cache";

export const authOptions: AuthOptions = {

    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@yahoo.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials){
                
                //Check if there is am email and password 
                if(!credentials?.email || !credentials.password){
                    throw new Error("Missing email or password!");
                }

                //Check if there is user with provided email
                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                });

                if(!user || !user?.hashedPassword){
                    throw new Error("There is now user with this email.Sorry!")
                }

                //Check if the passwords matched
                const matchedPasswords = await bcrypt.compare(credentials.password,user.hashedPassword);

                if(!matchedPasswords){
                    throw new Error("Incorect password!")
                }
                
                return user;
            }
        })
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt"
    },
    debug: process.env.NODE_ENV === "development"
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}