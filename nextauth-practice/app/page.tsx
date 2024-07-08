import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import UserSession from "./components/UserSession";

export default async function Home() {

  //server side retrieving session data
  const session = await getServerSession(authOptions);

  return (
    <div>
      <p>Server side rendering - {session == null ? "not logged in" : "logged in"}</p>
      <p>{JSON.stringify(session)}</p>
      <p>Client side rendering</p>
      <UserSession />
    </div>
  );
}
