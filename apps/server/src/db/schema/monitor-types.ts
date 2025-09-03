import { pgEnum } from "drizzle-orm/pg-core";

export const monitorTypeEnum = pgEnum("monitor_type", [
  "http",
  "ping",
  "pagespeed",
  "hardware",
  "docker",
  "port",
  "game",
]);
