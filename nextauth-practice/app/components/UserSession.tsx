"use client";
import React from "react";

import { useSession } from "next-auth/react";

const UserSession = () => {
  const { data: session,status } = useSession();

  console.log(status);
  

  return (
    <div>
      <p>{session == null ? "not logged in" : "logged in"}</p>
      <p>{JSON.stringify(session)} --- {status}</p>
    </div>
  );
};

export default UserSession;
