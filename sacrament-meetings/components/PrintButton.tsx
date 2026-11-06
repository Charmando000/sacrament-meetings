"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
    >
      Print Meeting Program
    </button>
  );
}