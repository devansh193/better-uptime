import { StatusView } from "@/modules/status-view";
import { queryClient, trpc } from "@/utils/trpc";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Home() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<p>Error.</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <StatusView />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
