import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import UserSession from "./components/UserSession";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Home() {

  //server side retrieving session data
  //revalidatePath("/");
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
