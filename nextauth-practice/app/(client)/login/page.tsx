//"use client";
import React, { FormEvent, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import LoginForm from "../../components/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const page = async () => {

  // const session = await getServerSession(authOptions)

  // if(session){
  //   redirect("/");
  // }
  

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <LoginForm />
      
    </div>
  );
};

export default page;
