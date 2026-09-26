import type { ReactNode } from "react";

type MeetingsLayoutProps = {
  children: ReactNode;
};

export default function MeetingsLayout({
  children,
}: MeetingsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {children}
      </div>
    </div>
  );
}