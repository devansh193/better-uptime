import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import type { Metadata } from "next";
import { MonitorView } from "@/modules/monitors/ui/views/monitor-view";
import { queryClient, trpc } from "@/utils/trpc";

export const metadata: Metadata = {
  title: "Monitors | Better Uptime",
  description: "Monitor your websites and APIs with Better Uptime.",
};

const Page = () => {
  void queryClient.prefetchQuery(trpc.monitor.getAll.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <Suspense fallback={<div>Loading...</div>}>
          <MonitorView />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default Page;
