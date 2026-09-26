import Link from "next/link";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  query: string;
};

export default function Pagination({
  totalPages,
  currentPage,
  query,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (query) {
      params.set("query", query);
    }

    params.set("page", pageNumber.toString());

    return `/meetings?${params.toString()}`;
  };

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-4"
      aria-label="Pagination"
    >
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Previous
        </Link>
      )}

      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </nav>
  );
}