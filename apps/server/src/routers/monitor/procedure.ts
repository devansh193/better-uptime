import { pingMonitorConfig } from "@/db/schema/ping-monitor-config";
import { httpMonitorConfig } from "@/db/schema/http-monitor-config";
import { protectedProcedure, router } from "@/lib/trpc";
import { monitor } from "@/db/schema/monitor";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import z from "zod";
import { createMonitorInput } from "@/types";

export const monitorRouter = router({
  getActive: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    const activeMonitors = await db
      .select()
      .from(monitor)
      .where(and(eq(monitor.userId, userId), eq(monitor.isActive, true)));
    if (!activeMonitors) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No active monitors found.",
      });
    }
    return activeMonitors;
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const this_monitor = await db
        .select()
        .from(monitor)
        .where(and(eq(monitor.userId, userId), eq(monitor.id, input.id)));
      if (!this_monitor) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Monitor with id ${input.id} not found`,
        });
      }
      return this_monitor;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    const all_monitors = await db
      .select()
      .from(monitor)
      .where(eq(monitor.userId, userId));
    if (!all_monitors) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No monitors found",
      });
    }
    return all_monitors;
  }),
  create: protectedProcedure
    .input(createMonitorInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id: userId } = ctx.user;
        return await db.transaction(async (tx) => {
          const [newMonitor] = await tx
            .insert(monitor)
            .values({
              userId,
              name: input.name,
              monitorType: input.monitorType as any,
              intervalSeconds: input.intervalSecond,
              alertThreshold: input.alertThreshold,
            })
            .returning();
          switch (input.monitorType) {
            case "http":
              if (!input.url) {
                throw new TRPCError({
                  code: "NOT_FOUND",
                  message: "URL is required for HTTP monitor",
                });
              }
              await tx.insert(httpMonitorConfig).values({
                monitorId: newMonitor.id,
                url: input.url,
                ignoreTlsError: input.ignoreTlsError,
                jsonPath: input.jsonPath,
                expectedValue: input.expectedValue,
                matchMethod: input.matchMethod,
              });
              break;
            case "ping":
              if (!input.hostname) {
                throw new TRPCError({
                  code: "NOT_FOUND",
                  message: "Host is required for PINT monitor",
                });
              }
              await tx.insert(pingMonitorConfig).values({
                monitorId: newMonitor.id,
                hostname: input.hostname,
              });
              break;

            default:
              throw new TRPCError({
                code: "METHOD_NOT_SUPPORTED",
                message: `Unsupported monitor type ${input.monitorType}`,
              });
          }
          return newMonitor;
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create monitor",
        });
      }
    }),
});
