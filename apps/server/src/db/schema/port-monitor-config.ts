import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { monitor } from "./monitor";

export const portMonitorConfig = pgTable("port_monitor_config", {
  monitorId: uuid("monitor_id")
    .notNull()
    .references(() => monitor.id, { onDelete: "cascade" }),
  host: varchar("host", { length: 255 }).notNull(),
  port: integer("port").notNull(),
});
