"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

type RegisterFormFields = {
  name: string;
  email: string;
  password: string;
};

const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full name should be at least 2 characters long!" }),
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Password should be at least 4 characters long!" }),
});

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(RegisterSchema),
  });

  const registerUser: SubmitHandler<RegisterFormFields> = async (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;

    try {
      const resp = await axios.post("/api/register", {
        name: name,
        email: email,
        password: password,
      });

      console.log(resp);

      if (resp.request.status === 200) {
        console.log("OK");
        router.push("/login");
        toast.success("Registration was successfuly");
      } else {
        console.log("Something went wrong");
        console.log(resp.request.responseText);
        toast.error(resp.request.responseText);
      }
    } catch (error: any) {
      console.log(error?.request?.responseText);
      router.push("/");
      toast.error(error.request.responseText);
    }
  };

  //This is the first approach without validation. Here we should manually do preventDefault but when we use handleSubmit form react-hook-form like above it is no longer needed.

  // async function registerUser(e: FormEvent<HTMLFormElement>) {
  //     e.preventDefault();

  //     const form = new FormData(e.currentTarget);

  //     const name = form.get("name");
  //     const email = form.get("email");
  //     const password = form.get("password");

  //     try {

  //       const resp = await axios.post("/api/register", {name: name, email: email, password: password});

  //       console.log(resp);

  //       if (resp.request.status === 200) {

  //         console.log("OK");
  //         router.push('/login')
  //         alert("Registration was successfuly")

  //       } else {

  //         console.log("Something went wrong");
  //         console.log(resp.request.responseText);
  //         alert(resp.request.responseText)
  //       }

  //     } catch (error: any) {
  //       console.log(error?.request?.responseText);
  //       router.push('/')
  //       alert(error.request.responseText)
  //     }
  //   }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        onSubmit={handleSubmit(registerUser)}
        method="POST"
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Full Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("name")}
            />
            <span className="text-red-600 tracking-widest text-sm">
              {errors?.name?.message}
            </span>
          </div>
        </div>

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
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("email")}
            />
            <span className="text-red-600 tracking-widest text-sm">
              {errors?.email?.message}
            </span>
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
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("password")}
            />
            <span className="text-red-600 tracking-widest text-sm">
              {errors?.password?.message}
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white tracking-widest shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>

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
  );
};

export default RegisterForm;
