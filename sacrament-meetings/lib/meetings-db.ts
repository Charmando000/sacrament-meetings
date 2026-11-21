import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);
const ITEMS_PER_PAGE = 5;

export async function getMeetings(query = "", currentPage = 1): Promise<SacramentMeeting[]> {
  const searchTerm = "%" + query + "%";
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const rows = await sql`
    SELECT
      id, to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType", presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers,
      closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query = ""): Promise<number> {
  const searchTerm = "%" + query + "%";
  const rows = await sql`
    SELECT COUNT(*) AS count FROM meetings
    WHERE presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id, to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType", presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers,
      closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as SacramentMeeting) ?? null;
}

export async function getMeetingsByDate(date: string): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT
      id, to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType", presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers,
      closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
    FROM meetings WHERE date = ${date} ORDER BY date DESC
  `;
  return rows as SacramentMeeting[];
}

export async function addMeeting(meeting: Omit<SacramentMeeting, "id">): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements, opening_hymn,
      opening_prayer, ward_business, stake_business, sacrament_hymn, speakers,
      closing_hymn, closing_prayer
    ) VALUES (
      ${meeting.date}, ${meeting.meetingType}, ${meeting.presiding}, ${meeting.conducting},
      ${meeting.announcements ?? []},
      ${JSON.stringify(meeting.openingHymn)}::jsonb, ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)}::jsonb, ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      ${JSON.stringify(meeting.speakers)}::jsonb,
      ${JSON.stringify(meeting.closingHymn)}::jsonb, ${meeting.closingPrayer}
    )
    RETURNING
      id, to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType", presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers,
      closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
  `;
  return rows[0] as SacramentMeeting;
}

export async function updateMeeting(id: number, meeting: Omit<SacramentMeeting, "id">): Promise<SacramentMeeting> {
  const rows = await sql`
    UPDATE meetings SET
      date = ${meeting.date},
      meeting_type = ${meeting.meetingType},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      announcements = ${meeting.announcements ?? []},
      opening_hymn = ${JSON.stringify(meeting.openingHymn)}::jsonb,
      opening_prayer = ${meeting.openingPrayer},
      ward_business = ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      stake_business = ${meeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(meeting.speakers)}::jsonb,
      closing_hymn = ${JSON.stringify(meeting.closingHymn)}::jsonb,
      closing_prayer = ${meeting.closingPrayer}
    WHERE id = ${id}
    RETURNING
      id, to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType", presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers,
      closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
  `;
  if (!rows[0]) throw new Error("Meeting not found.");
  return rows[0] as SacramentMeeting;
}

export async function deleteMeeting(id: number): Promise<void> {
  await sql`DELETE FROM meetings WHERE id = ${id}`;
}
