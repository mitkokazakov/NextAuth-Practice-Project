"use client";
import React from "react";

import { useSession } from "next-auth/react";

const UserSession = () => {
  const { data: session } = useSession();

  return (
    <div>
      <p>{session == null ? "not logged in" : "logged in"}</p>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default UserSession;
