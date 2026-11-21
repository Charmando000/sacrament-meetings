import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { updateMeeting } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";

type EditMeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) notFound();

  const meeting = await getMeetingById(meetingId);
  if (!meeting) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <Link href={"/meetings/" + meeting.id} className="font-medium text-blue-700 underline">Back to meeting</Link>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">Edit sacrament meeting</h1>
        <p className="mt-2 text-gray-600">Update the meeting program details.</p>
      </div>
      <MeetingForm action={updateMeeting.bind(null, meeting.id)} initialData={meeting} />
    </main>
  );
}
