import {
  integer,
  pgTable,
  uuid,
  varchar,
  boolean,
  decimal,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { monitorTypeEnum } from "./monitor-types";

export const monitor = pgTable("monitor", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  monitorType: monitorTypeEnum("monitor_type").notNull().default("http"),
  isActive: boolean("is_Active").default(true),
  intervalSeconds: integer("interval_seconds").notNull().default(300),
  alertThreshold: integer("alert_threshold").notNull().default(5),
  uptimePercentage: decimal("uptime_percentage", { precision: 5, scale: 2 }),
  status: boolean("status"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
