"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { MonitorAbsent } from "./monitor-absent";
import { MonitorCard } from "./monitor-card";
import { trpc } from "@/utils/trpc";

export const MonitorContent = () => {
  const { data: monitors } = useSuspenseQuery(
    trpc.website.getMany.queryOptions()
  );
  if (monitors.length === 0) {
    return (
      <>
        <MonitorAbsent />
      </>
    );
  } else {
    return (
      <div>
        <MonitorCard />
      </div>
    );
  }
};
