import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Meeting not found</h2>
      <p className="mt-3 text-gray-600">The meeting you are trying to edit does not exist or may have been deleted.</p>
      <Link href="/meetings" className="mt-6 inline-block rounded-md bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800">
        Back to meetings
      </Link>
    </section>
  );
}
