"use client";
import React, { FormEvent, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {

  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {

    console.log(session);

    if (status === 'authenticated') {
      router.push('/')
    }
    
    
  },[])
  

  async function loggUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    const data = {
      email: email,
      password: password,
    };

    signIn('credentials',{...data, redirect: true, callbackUrl:"/"}).then((callback) => {

      if(callback?.error){
        alert(callback.error)
      }

      if(callback?.ok){

        //router.push("/");
        alert("User logged in successful");
      }
    })

  }

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

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={loggUser} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="w-full min-h-9 mt-10 relative">
          <div className="absolute top-[50%] w-full h-[1px] bg-slate-300 "></div>
          <div className="bg-white flex justify-center items-center py-3 px-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <p>Or continue with</p>
          </div>
        </div>

        <div className="w-full flex justify-center items-center mt-5">
          <button onClick={async () => await signIn('google',{redirect: true, callbackUrl:"/"})}>
            <div className="flex justify-center items-center gap-3 border-slate-200 border-[1px] px-16 py-1 rounded-lg">
              <img
                className="w-8 h-8"
                src="https://cdn-icons-png.freepik.com/256/13170/13170545.png?semt=ais_hybrid"
                alt="Google"
              />
              <p>Google</p>
            </div>
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
};

export default page;
