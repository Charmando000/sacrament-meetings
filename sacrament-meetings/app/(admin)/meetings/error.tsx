"use client";

import Link from "next/link";

type MeetingsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function MeetingsError({ error, reset }: MeetingsErrorProps) {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
      <p className="mt-3 text-gray-600">We could not complete your request. Please try again.</p>
      <div className="mt-6 flex justify-center gap-4">
        <button onClick={() => reset()} className="rounded-md bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800">Try Again</button>
        <Link href="/meetings" className="rounded-md border px-5 py-2.5 font-semibold text-gray-800">Back to meetings</Link>
      </div>
      {error.digest && <p className="mt-4 text-xs text-gray-500">Reference: {error.digest}</p>}
    </section>
  );
}
