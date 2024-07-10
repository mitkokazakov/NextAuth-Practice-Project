import axios from "axios";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

async function registerUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    try {

      const resp = await axios.post("/api/register", {name: name, email: email, password: password});

      console.log(resp);

      if (resp.request.status === 200) {
        console.log("OK");
      } else {
        console.log("Something went wrong");
        console.log(resp.request.responseText);
        
      }


    } catch (error: any) {
      console.log(error.request.responseText);
      redirect('/');
    }
  }

  export default registerUser