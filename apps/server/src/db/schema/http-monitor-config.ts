import { boolean, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { monitor } from "./monitor";

export const httpMonitorConfit = pgTable("http_monitor_config", {
  monitorId: uuid("monitor_id")
    .notNull()
    .references(() => monitor.id, { onDelete: "cascade" }),
  url: varchar("url", { length: 2048 }).notNull(),
  ignoreTlsError: boolean("ignore_tls_error").notNull().default(false),
  jsonPath: varchar("json_path", { length: 500 }),
  expectedValue: text("expected_value"),
  matchMethod: varchar("match_method", { length: 20 }),
});
