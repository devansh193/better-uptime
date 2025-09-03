import { monitorRouter } from "./monitor/procedure";
import { router } from "../lib/trpc";
import { todoRouter } from "./todo";

export const appRouter = router({
  monitor: monitorRouter,
  todo: todoRouter,
});
export type AppRouter = typeof appRouter;
