import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogOut from "./LogOut";
import { revalidatePath } from "next/cache";

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  const firstName = session?.user?.name?.split(" ")[0];

  const firstLetter = session?.user?.name?.split(" ")[0][0];

  return (
    <div className="w-full h-16 bg-lime-100 flex justify-between items-center px-20">
      <div className="">
        <Link href={"/"}>Home</Link>
      </div>

      <p>Hi {firstName}!</p>

      <div className="flex justify-center items-center gap-8">
        {session != null ? <Link href={"/protected"}>Protected</Link> : null}
        {session == null ? <Link href={"/register"}>Register</Link> : null}
        {session == null ? <Link href={"/login"}>Login</Link> : null}

        {session != null ? (
          <div className=" bg-slate-200 h-12 w-12 rounded-full flex items-center justify-center text-2xl font-bold">
            {firstLetter}
          </div>
        ) : null}

        {session != null ? <LogOut /> : null}
      </div>
    </div>
  );
};

export default NavBar;
