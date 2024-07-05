import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(authOptions);

  return (
    <div>
      <p>Main Page</p>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
