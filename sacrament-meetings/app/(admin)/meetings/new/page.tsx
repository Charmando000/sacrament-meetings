import Link from "next/link";
import MeetingForm from "@/components/MeetingForm";
import { createMeeting } from "@/lib/actions";

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <Link href="/meetings" className="font-medium text-blue-700 underline">Back to meetings</Link>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">Create a sacrament meeting</h1>
        <p className="mt-2 text-gray-600">Enter the details for the meeting program.</p>
      </div>
      <MeetingForm action={createMeeting} />
    </main>
  );
}
