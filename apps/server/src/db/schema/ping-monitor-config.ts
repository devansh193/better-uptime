import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { monitor } from "./monitor";

export const pingMonitorConfig = pgTable("ping_monitor_config", {
  monitorId: uuid("monitor_id")
    .notNull()
    .references(() => monitor.id, { onDelete: "cascade" }),
  hostname: varchar("hostname", { length: 255 }).notNull(),
  packetCount: integer("packet_count").notNull().default(4),
  timeoutSeconds: integer("timeout_seconds").notNull().default(5),
  responseTimeThresholdMs: integer("response_time_threshold_ms").default(1000),
  packetLossThresholdPercent: integer("packet_loss_threshold_percent").default(
    25
  ),
});

export type pingMonitor = typeof pingMonitorConfig.$inferSelect;
export type pintMonitorInput = typeof pingMonitorConfig.$inferInsert;
