import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

type MeetingPageProps = {
  params: Promise<{ id: string }>;
};

async function getMeeting(id: string): Promise<SacramentMeeting> {
  const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const response = await fetch(`${baseUrl}/api/meetings/${id}`, {
  cache: "no-store",
});

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch meeting");
  }

  return response.json() as Promise<SacramentMeeting>;
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeeting(id);

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <MeetingDetail meeting={meeting} />
    </section>
  );
}