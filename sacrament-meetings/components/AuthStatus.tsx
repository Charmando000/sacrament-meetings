import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function AuthStatus() {
  const session = await auth();
  if (!session?.user) {
    return <Link href="/login" className="text-sm font-medium text-blue-700 hover:underline">Bishopric sign in</Link>;
  }
  return (
    <form action={async () => {
      "use server";
      await signOut({ redirectTo: "/" });
    }}>
      <button type="submit" className="text-sm font-medium text-blue-700 hover:underline">Sign out</button>
    </form>
  );
}
