import z from "zod";
import type { httpMonitor } from "./db/schema/http-monitor-config";
import type { pingMonitor } from "./db/schema/ping-monitor-config";
import type { portMonitor } from "./db/schema/port-monitor-config";

export const createMonitorInput = z.discriminatedUnion("monitorType", [
  z.object({
    monitorType: z.literal("http"),
    name: z.string().min(3),
    intervalSecond: z.number().default(300),
    alertThreshold: z.number().default(5),
    url: z.string().url(),
    secrets: z.string().optional(),
    ignoreTlsError: z.boolean().default(false),
    jsonPath: z.string().optional(),
    expectedValue: z.string().optional(),
    matchMethod: z.string().optional(),
  }),
  z.object({
    monitorType: z.literal("ping"),
    name: z.string().min(3),
    intervalSecond: z.number().default(300),
    alertThreshold: z.number().default(5),
    hostname: z.string().min(1),
    packetCount: z.number().default(4),
    timeoutSeconds: z.number().default(5),
    responseTimeThresholdMs: z.number().default(1000),
    packetLossThresholdPercent: z.number().default(25),
  }),
  z.object({
    monitorType: z.literal("port"),
    name: z.string().min(3),
    intervalSecond: z.number().default(300),
    alertThreshold: z.number().default(5),
    host: z.string().min(1),
    port: z.number().min(1).max(65535),
  }),
]);

interface BaseMonitorJob {
  name: string;
  interval: number;
}

export interface HttpMonitorJob extends BaseMonitorJob {
  type: "http";
  data: Omit<httpMonitor, "monitorId">;
}
export interface PingMonitorJob extends BaseMonitorJob {
  type: "ping";
  data: Omit<pingMonitor, "monitorId">;
}
export interface PortMonitorJob extends BaseMonitorJob {
  type: "port";
  data: Omit<portMonitor, "monitorId">;
}

export type MonitorJob = HttpMonitorJob | PingMonitorJob | PortMonitorJob;
