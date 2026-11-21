"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  addMeeting,
  deleteMeeting as deleteMeetingRecord,
  updateMeeting as updateMeetingRecord,
} from "@/lib/meetings-db";
import type { MeetingType, SacramentMeeting, SpeakerItem } from "@/lib/types";

export type MeetingFormState = {
  message: string | null;
  errors?: Record<string, string[]>;
  values?: Record<string, string | boolean>;
};

const hymnNumberSchema = z.string().trim().min(1, "Enter a hymn number.")
  .regex(/^\d+$/, "Hymn number must be a whole number.")
  .transform(Number)
  .pipe(z.number().int().positive("Hymn number must be greater than zero."));

const speakersSchema = z.string().superRefine((value, context) => {
  const lines = value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  lines.forEach((line, index) => {
    const parts = line.split("|").map((part) => part.trim());
    if (parts.length < 3 || !parts[0] || !parts[1]) {
      context.addIssue({
        code: "custom",
        message: "Line " + (index + 1) + " must use: Name | Topic | speaker (or musical-number).",
      });
    } else if (parts[2] !== "speaker" && parts[2] !== "musical-number") {
      context.addIssue({
        code: "custom",
        message: "Line " + (index + 1) + " type must be speaker or musical-number.",
      });
    }
  });
});

const MeetingFormSchema = z.object({
  date: z.string().trim().refine((value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split("-").map(Number);
    const parsedDate = new Date(Date.UTC(year, month - 1, day));
    return parsedDate.getUTCFullYear() === year
      && parsedDate.getUTCMonth() === month - 1
      && parsedDate.getUTCDate() === day;
  }, "Choose a valid meeting date."),
  meetingType: z.enum(["testimony", "regular", "stake", "general"]),
  presiding: z.string().trim().min(1, "Enter the presiding person."),
  conducting: z.string().trim().min(1, "Enter the conducting person."),
  announcements: z.string().optional().default(""),
  openingHymnNumber: hymnNumberSchema,
  openingHymnTitle: z.string().trim().min(1, "Enter the opening hymn title."),
  openingPrayer: z.string().trim().min(1, "Enter the opening prayer."),
  wardBusiness: z.string().optional().default(""),
  stakeBusiness: z.boolean(),
  sacramentHymnNumber: hymnNumberSchema,
  sacramentHymnTitle: z.string().trim().min(1, "Enter the sacrament hymn title."),
  speakers: speakersSchema,
  closingHymnNumber: hymnNumberSchema,
  closingHymnTitle: z.string().trim().min(1, "Enter the closing hymn title."),
  closingPrayer: z.string().trim().min(1, "Enter the closing prayer."),
});

function getFormValues(formData: FormData) {
  return {
    date: String(formData.get("date") ?? ""),
    meetingType: String(formData.get("meetingType") ?? ""),
    presiding: String(formData.get("presiding") ?? ""),
    conducting: String(formData.get("conducting") ?? ""),
    announcements: String(formData.get("announcements") ?? ""),
    openingHymnNumber: String(formData.get("openingHymnNumber") ?? ""),
    openingHymnTitle: String(formData.get("openingHymnTitle") ?? ""),
    openingPrayer: String(formData.get("openingPrayer") ?? ""),
    wardBusiness: String(formData.get("wardBusiness") ?? ""),
    stakeBusiness: formData.get("stakeBusiness") === "on",
    sacramentHymnNumber: String(formData.get("sacramentHymnNumber") ?? ""),
    sacramentHymnTitle: String(formData.get("sacramentHymnTitle") ?? ""),
    speakers: String(formData.get("speakers") ?? ""),
    closingHymnNumber: String(formData.get("closingHymnNumber") ?? ""),
    closingHymnTitle: String(formData.get("closingHymnTitle") ?? ""),
    closingPrayer: String(formData.get("closingPrayer") ?? ""),
  };
}

function toMeeting(values: z.output<typeof MeetingFormSchema>): Omit<SacramentMeeting, "id"> {
  const speakers: SpeakerItem[] = values.speakers
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, topic, type] = line.split("|").map((part) => part.trim());
      return { name, topic, type: type as SpeakerItem["type"] };
    });

  return {
    date: values.date,
    meetingType: values.meetingType as MeetingType,
    presiding: values.presiding,
    conducting: values.conducting,
    announcements: values.announcements.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    openingHymn: { number: values.openingHymnNumber, title: values.openingHymnTitle },
    openingPrayer: values.openingPrayer,
    wardBusiness: values.wardBusiness.split(/\r?\n/).map((description) => description.trim()).filter(Boolean).map((description) => ({ description })),
    stakeBusiness: values.stakeBusiness,
    sacramentHymn: { number: values.sacramentHymnNumber, title: values.sacramentHymnTitle },
    speakers,
    closingHymn: { number: values.closingHymnNumber, title: values.closingHymnTitle },
    closingPrayer: values.closingPrayer,
  };
}

export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const parsed = MeetingFormSchema.safeParse(getFormValues(formData));
  if (!parsed.success) {
    return {
      message: "Please correct the errors below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values: getFormValues(formData),
    };
  }

  try {
    await addMeeting(toMeeting(parsed.data));
  } catch (error) {
    console.error("Database error while creating meeting:", error);
    throw new Error("Unable to create the meeting. Please try again.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const parsed = MeetingFormSchema.safeParse(getFormValues(formData));
  if (!parsed.success) {
    return {
      message: "Please correct the errors below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values: getFormValues(formData),
    };
  }

  try {
    await updateMeetingRecord(id, toMeeting(parsed.data));
  } catch (error) {
    console.error("Database error while updating meeting:", error);
    throw new Error("Unable to update the meeting. Please try again.");
  }

  revalidatePath("/meetings");
  revalidatePath("/meetings/" + id);
  redirect("/meetings");
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid meeting ID.");

  try {
    await deleteMeetingRecord(id);
  } catch (error) {
    console.error("Database error while deleting meeting:", error);
    throw new Error("Unable to delete the meeting. Please try again.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}
