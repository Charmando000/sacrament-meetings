import { redirect } from "next/navigation";
import { getMeetingsByDate } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const mostRecentSunday = new Date(today);
  mostRecentSunday.setDate(today.getDate() - dayOfWeek);

  const year = mostRecentSunday.getFullYear();
  const month = String(mostRecentSunday.getMonth() + 1).padStart(2, "0");
  const day = String(mostRecentSunday.getDate()).padStart(2, "0");

  const sundayDate = `${year}-${month}-${day}`;

  const meetings = await getMeetingsByDate(sundayDate);

  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  }

  redirect("/meetings");
}