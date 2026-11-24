import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to manage sacrament meeting programs.",
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md items-center px-6 py-12">
      <section className="w-full rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Bishopric sign in</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to create and update sacrament meeting programs.</p>
        <div className="mt-6"><LoginForm /></div>
      </section>
    </main>
  );
}
