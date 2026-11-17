"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-8">
      <label
        htmlFor="meeting-search"
        className="sr-only"
      >
        Search meetings
      </label>

      <input
        id="meeting-search"
        type="search"
        placeholder="Search by speaker, presiding, conducting, or meeting type..."
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900"
        aria-label="Search meetings"
      />
    </div>
  );
}