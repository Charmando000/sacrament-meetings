"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import type { MeetingFormState } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

type MeetingFormAction = (
  previousState: MeetingFormState,
  formData: FormData,
) => Promise<MeetingFormState>;

type MeetingFormProps = {
  action: MeetingFormAction;
  initialData?: SacramentMeeting;
};

const initialState: MeetingFormState = { message: null };

export default function MeetingForm({ action, initialData }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = state.errors;

  useEffect(() => {
    if (!state.values || !formRef.current) return;

    for (const [name, value] of Object.entries(state.values)) {
      const field = formRef.current.elements.namedItem(name);

      if (field instanceof HTMLInputElement && field.type === "checkbox") {
        field.checked = Boolean(value);
      } else if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement ||
        field instanceof HTMLSelectElement
      ) {
        field.value = String(value);
      }
    }
  }, [state.values]);

  const fieldError = (name: string) => (
    <p id={name + "-error"} aria-live="polite" className="mt-1 text-sm text-red-700">
      {errors?.[name]?.join(" ")}
    </p>
  );

  const inputClass = "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200";

  return (
    <form ref={formRef} action={formAction} className="space-y-8 rounded-lg border bg-white p-6 shadow-sm">
      {state.message && (
        <p role="status" className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <section className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-800">Meeting date</label>
          <input id="date" name="date" type="date" required defaultValue={initialData?.date ?? ""} aria-describedby="date-error" aria-invalid={Boolean(errors?.date)} className={inputClass} />
          {fieldError("date")}
        </div>
        <div>
          <label htmlFor="meetingType" className="block text-sm font-medium text-gray-800">Meeting type</label>
          <select id="meetingType" name="meetingType" defaultValue={initialData?.meetingType ?? "regular"} aria-describedby="meetingType-error" aria-invalid={Boolean(errors?.meetingType)} className={inputClass}>
            <option value="testimony">Testimony</option>
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          {fieldError("meetingType")}
        </div>
        <div>
          <label htmlFor="presiding" className="block text-sm font-medium text-gray-800">Presiding</label>
          <input id="presiding" name="presiding" required defaultValue={initialData?.presiding ?? ""} aria-describedby="presiding-error" aria-invalid={Boolean(errors?.presiding)} className={inputClass} />
          {fieldError("presiding")}
        </div>
        <div>
          <label htmlFor="conducting" className="block text-sm font-medium text-gray-800">Conducting</label>
          <input id="conducting" name="conducting" required defaultValue={initialData?.conducting ?? ""} aria-describedby="conducting-error" aria-invalid={Boolean(errors?.conducting)} className={inputClass} />
          {fieldError("conducting")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Announcements and business</h2>
        <div>
          <label htmlFor="announcements" className="block text-sm font-medium text-gray-800">Announcements (one per line)</label>
          <textarea id="announcements" name="announcements" rows={3} defaultValue={initialData?.announcements?.join("\n") ?? ""} aria-describedby="announcements-error" aria-invalid={Boolean(errors?.announcements)} className={inputClass} />
          {fieldError("announcements")}
        </div>
        <div>
          <label htmlFor="wardBusiness" className="block text-sm font-medium text-gray-800">Ward business (one item per line)</label>
          <textarea id="wardBusiness" name="wardBusiness" rows={3} defaultValue={initialData?.wardBusiness.map((item) => item.description).join("\n") ?? ""} aria-describedby="wardBusiness-error" aria-invalid={Boolean(errors?.wardBusiness)} className={inputClass} />
          {fieldError("wardBusiness")}
        </div>
        <label htmlFor="stakeBusiness" className="flex items-center gap-3 text-sm font-medium text-gray-800">
          <input id="stakeBusiness" name="stakeBusiness" type="checkbox" defaultChecked={initialData?.stakeBusiness ?? false} className="h-4 w-4 rounded border-gray-300" />
          Stake business will be presented
        </label>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Opening</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="openingHymnNumber" className="block text-sm font-medium text-gray-800">Opening hymn number</label>
            <input id="openingHymnNumber" name="openingHymnNumber" type="number" min="1" required defaultValue={initialData?.openingHymn.number ?? ""} aria-describedby="openingHymnNumber-error" aria-invalid={Boolean(errors?.openingHymnNumber)} className={inputClass} />
            {fieldError("openingHymnNumber")}
          </div>
          <div>
            <label htmlFor="openingHymnTitle" className="block text-sm font-medium text-gray-800">Opening hymn title</label>
            <input id="openingHymnTitle" name="openingHymnTitle" required defaultValue={initialData?.openingHymn.title ?? ""} aria-describedby="openingHymnTitle-error" aria-invalid={Boolean(errors?.openingHymnTitle)} className={inputClass} />
            {fieldError("openingHymnTitle")}
          </div>
        </div>
        <div>
          <label htmlFor="openingPrayer" className="block text-sm font-medium text-gray-800">Opening prayer</label>
          <input id="openingPrayer" name="openingPrayer" required defaultValue={initialData?.openingPrayer ?? ""} aria-describedby="openingPrayer-error" aria-invalid={Boolean(errors?.openingPrayer)} className={inputClass} />
          {fieldError("openingPrayer")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Sacrament</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sacramentHymnNumber" className="block text-sm font-medium text-gray-800">Sacrament hymn number</label>
            <input id="sacramentHymnNumber" name="sacramentHymnNumber" type="number" min="1" required defaultValue={initialData?.sacramentHymn.number ?? ""} aria-describedby="sacramentHymnNumber-error" aria-invalid={Boolean(errors?.sacramentHymnNumber)} className={inputClass} />
            {fieldError("sacramentHymnNumber")}
          </div>
          <div>
            <label htmlFor="sacramentHymnTitle" className="block text-sm font-medium text-gray-800">Sacrament hymn title</label>
            <input id="sacramentHymnTitle" name="sacramentHymnTitle" required defaultValue={initialData?.sacramentHymn.title ?? ""} aria-describedby="sacramentHymnTitle-error" aria-invalid={Boolean(errors?.sacramentHymnTitle)} className={inputClass} />
            {fieldError("sacramentHymnTitle")}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Speakers and musical numbers</h2>
        <div>
          <label htmlFor="speakers" className="block text-sm font-medium text-gray-800">One person or number per line</label>
          <p className="mt-1 text-sm text-gray-600">Use this format: Name | Topic | speaker. For music, use musical-number as the type.</p>
          <textarea id="speakers" name="speakers" rows={5} defaultValue={initialData?.speakers.map((item) => [item.name, item.topic, item.type].join(" | ")).join("\n") ?? ""} aria-describedby="speakers-error" aria-invalid={Boolean(errors?.speakers)} className={inputClass} />
          {fieldError("speakers")}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Closing</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="closingHymnNumber" className="block text-sm font-medium text-gray-800">Closing hymn number</label>
            <input id="closingHymnNumber" name="closingHymnNumber" type="number" min="1" required defaultValue={initialData?.closingHymn.number ?? ""} aria-describedby="closingHymnNumber-error" aria-invalid={Boolean(errors?.closingHymnNumber)} className={inputClass} />
            {fieldError("closingHymnNumber")}
          </div>
          <div>
            <label htmlFor="closingHymnTitle" className="block text-sm font-medium text-gray-800">Closing hymn title</label>
            <input id="closingHymnTitle" name="closingHymnTitle" required defaultValue={initialData?.closingHymn.title ?? ""} aria-describedby="closingHymnTitle-error" aria-invalid={Boolean(errors?.closingHymnTitle)} className={inputClass} />
            {fieldError("closingHymnTitle")}
          </div>
        </div>
        <div>
          <label htmlFor="closingPrayer" className="block text-sm font-medium text-gray-800">Closing prayer</label>
          <input id="closingPrayer" name="closingPrayer" required defaultValue={initialData?.closingPrayer ?? ""} aria-describedby="closingPrayer-error" aria-invalid={Boolean(errors?.closingPrayer)} className={inputClass} />
          {fieldError("closingPrayer")}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={isPending} className="rounded-md bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">
          {isPending ? "Saving..." : initialData ? "Update meeting" : "Create meeting"}
        </button>
        <Link href="/meetings" className="font-medium text-gray-700 underline">Cancel</Link>
      </div>
    </form>
  );
}
