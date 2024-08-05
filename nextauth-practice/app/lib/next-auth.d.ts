import { User } from "@prisma/client";

type UserId = string;

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: string;
  }
}
