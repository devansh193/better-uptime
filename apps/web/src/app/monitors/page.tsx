import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import type { Metadata } from "next";
import { MonitorView } from "@/modules/monitors/ui/views/monitor-view";
import { queryClient } from "@/utils/trpc";

export const metadata: Metadata = {
  title: "Monitors",
  description: "Monitor your websites and APIs with Better Uptime.",
};

const Page = () => {
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
