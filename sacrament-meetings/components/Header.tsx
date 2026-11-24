import NavLinks from "@/components/NavLinks";
import AuthStatus from "@/components/AuthStatus";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sacrament Meeting Planner</h1>
          <p className="text-sm text-gray-600">San Lorenzo Ward</p>
        </div>
        <NavLinks />
        <div className="flex items-center gap-4">
          <AuthStatus />
          <p className="text-sm text-gray-600">{currentDate}</p>
        </div>
      </div>
    </header>
  );
}
