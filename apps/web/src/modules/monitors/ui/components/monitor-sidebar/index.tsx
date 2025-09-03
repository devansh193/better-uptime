"use client";

import { UserSection } from "./user-section";
import { MainSection } from "./main-section";
import Link from "next/link";
import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";

const NAME = "Better Uptime";
export const MonitorSidebar = () => {
  const { open } = useSidebar();
  return (
    <Sidebar className="z-40 border-none! pt-2" collapsible="icon">
      <SidebarContent className="flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="relative h-12 px-4 py-4">
            <Link href={"/"}>
              <span
                className={`absolute text-lg font-medium text-neutral-100 transition-all duration-200 ease-in-out ${
                  open
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-95 opacity-0"
                }`}
              >
                {NAME}
              </span>
            </Link>
            <span
              className={`absolute text-lg font-medium text-neutral-100 transition-all duration-200 ease-in-out ${
                open
                  ? "pointer-events-none scale-95 opacity-0"
                  : "scale-100 opacity-100"
              }`}
            >
              {NAME.slice(0, 2)}
            </span>
          </div>
          <MainSection />
        </div>
        <UserSection />
      </SidebarContent>
    </Sidebar>
  );
};
