import type { SacramentMeeting } from "@/lib/types";

type MeetingDetailProps = {
  meeting: SacramentMeeting;
};

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  return (
    <article className="space-y-8 rounded-lg border bg-white p-6 shadow-sm">
      <header>
        <p className="text-sm text-gray-500">{meeting.date}</p>

        <h1 className="text-2xl font-bold text-gray-900">
          {meeting.meetingType} Meeting
        </h1>
      </header>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Leadership</h2>

        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Announcements</h2>

        {meeting.announcements?.length ? (
          <ul className="list-disc space-y-1 pl-5">
            {meeting.announcements.map((announcement) => (
              <li key={announcement}>{announcement}</li>
            ))}
          </ul>
        ) : (
          <p>No announcements.</p>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Opening</h2>

        <p>
          <strong>Hymn:</strong> #{meeting.openingHymn.number} -{" "}
          {meeting.openingHymn.title}
        </p>

        <p>
          <strong>Prayer:</strong> {meeting.openingPrayer}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Ward Business</h2>

        {meeting.wardBusiness.length ? (
          <ul className="list-disc space-y-1 pl-5">
            {meeting.wardBusiness.map((item) => (
              <li key={item.description}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p>No ward business.</p>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Stake Business</h2>

        <p>{meeting.stakeBusiness ? "Yes" : "No"}</p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Sacrament</h2>

        <p>
          <strong>Hymn:</strong> #{meeting.sacramentHymn.number} -{" "}
          {meeting.sacramentHymn.title}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Speakers & Musical Numbers</h2>

        {meeting.speakers.length ? (
          <ul className="space-y-3">
            {meeting.speakers.map((item, index) => (
              <li key={`${item.name}-${index}`}>
                <strong>{item.name}</strong>
                <span className="ml-2">({item.type})</span>

                {item.topic && (
                  <p className="text-gray-600">{item.topic}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No speakers or musical numbers.</p>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Closing</h2>

        <p>
          <strong>Hymn:</strong> #{meeting.closingHymn.number} -{" "}
          {meeting.closingHymn.title}
        </p>

        <p>
          <strong>Prayer:</strong> {meeting.closingPrayer}
        </p>
      </section>
    </article>
  );
}