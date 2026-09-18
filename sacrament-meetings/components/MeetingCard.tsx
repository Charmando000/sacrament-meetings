import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

type MeetingCardProps = {
  meeting: SacramentMeeting;
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          {meeting.date}
        </p>

        <h2 className="text-xl font-bold text-gray-900">
          {meeting.meetingType} Meeting
        </h2>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>

        <p>
          <strong>Opening Hymn:</strong>{" "}
          #{meeting.openingHymn.number} - {meeting.openingHymn.title}
        </p>

        <p>
          <strong>Sacrament Hymn:</strong>{" "}
          #{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}
        </p>

        <p>
          <strong>Closing Hymn:</strong>{" "}
          #{meeting.closingHymn.number} - {meeting.closingHymn.title}
        </p>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-5 inline-block font-semibold underline"
      >
        View meeting details
      </Link>
    </article>
  );
}