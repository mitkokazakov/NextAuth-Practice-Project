import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="w-full h-16 bg-lime-100 flex justify-between items-center px-20">

      <div className="">
      <Link href={"/"}>Home</Link>
      </div>

      <div className="flex justify-center items-center gap-8">
        <Link href={"/register"}>Register</Link>
        {/* <Link href={"/api/auth/signin"}>Login</Link> */}
        <Link href={"/login"}>Login</Link>
        <div className=" bg-slate-200 h-12 w-12 rounded-full"></div>
      </div>
    </div>
  );
};

export default NavBar;
