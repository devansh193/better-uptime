"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { usePrefetchOnHover } from "@/hooks/use-prefetch";

export default function Header() {
  const { prefetchTodos, prefetchDashboard } = usePrefetchOnHover();

  const links = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard", onHover: prefetchDashboard },
    { to: "/todos", label: "Todos", onHover: prefetchTodos },
  ] as const;

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label, onHover }) => {
            return (
              <Link key={to} href={to} onMouseEnter={onHover}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
      <hr />
    </div>
  );
}
