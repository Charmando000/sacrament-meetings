"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirect: false,
      redirectTo: "/meetings",
    });
    setIsPending(false);
    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }
    window.location.assign(result?.url ?? "/meetings");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900" />
      </div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={isPending}
        className="w-full rounded-md bg-blue-700 px-4 py-2.5 font-semibold text-white hover:bg-blue-800 disabled:opacity-60">
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
