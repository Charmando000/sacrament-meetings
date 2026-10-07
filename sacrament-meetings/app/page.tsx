import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-12 md:flex-row">
      <div className="flex-1">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          San Lorenzo Ward
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Sacrament Meeting Planner
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
          Plan and view sacrament meetings with all the information
          organized in one place.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/meetings"
            className="rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-700"
          >
            View Meetings
          </Link>

          <Link
            href="/meetings/current"
            className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Current Meeting
          </Link>
        </div>
      </div>

      <div className="flex-1">
        <Image
          src="/meeting-hero.svg"
          alt="Illustration representing a planned sacrament meeting"
          width={800}
          height={450}
          priority
          className="h-auto w-full rounded-xl"
        />
      </div>
    </section>
  );
}