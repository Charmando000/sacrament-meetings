import Link from "next/link";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

type MeetingsPageProps = {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const params = await searchParams;
  const query = params.query || "";
  const currentPage = Number(params.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sacrament Meetings</h1>
          <p className="mt-2 text-gray-600">View and manage planned sacrament meetings.</p>
        </div>
        <Link href="/meetings/new" className="inline-flex w-fit rounded-md bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800">
          Create meeting
        </Link>
      </header>

      <MeetingSearch />

      {meetings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}
        </div>
      ) : (
        <p className="mt-8 rounded-lg border bg-white p-6 text-gray-600">No meetings found. Create a meeting to get started.</p>
      )}

      <Pagination totalPages={totalPages} currentPage={currentPage} query={query} />
    </section>
  );
}
