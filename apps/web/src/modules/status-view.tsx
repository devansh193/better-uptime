"use client"
import { trpc } from "@/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";

export const StatusView = () => {
  const { data } = useSuspenseQuery(trpc.healthCheck.queryOptions());
  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};
