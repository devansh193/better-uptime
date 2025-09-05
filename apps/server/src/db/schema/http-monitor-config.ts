import { boolean, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { monitor } from "./monitor";

export const httpMonitorConfig = pgTable("http_monitor_config", {
  id: uuid("http_config_id").primaryKey().defaultRandom(),
  monitorId: uuid("monitor_id")
    .notNull()
    .references(() => monitor.id, { onDelete: "cascade" }),
  url: varchar("url", { length: 2048 }).notNull(),
  secrets: varchar("secrets", { length: 255 }),
  ignoreTlsError: boolean("ignore_tls_error").notNull().default(false),
  jsonPath: varchar("json_path", { length: 500 }),
  expectedValue: text("expected_value"),
  matchMethod: varchar("match_method", { length: 20 }),
});

export type httpMonitor = typeof httpMonitorConfig.$inferSelect;
export type httpMonitorInput = typeof httpMonitorConfig.$inferInsert;
