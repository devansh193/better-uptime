import type { PingMonitor } from "@/db/schema/ping-monitor-config";
import { TRPCError } from "@trpc/server";
import ping from "ping";

export async function requestPing(config: PingMonitor) {
  if (!config.hostname || !config.monitorId) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Hostname and monitorId required.",
    });
  }
  try {
    const result = await ping.promise.probe(config.hostname, {
      timeout: config.timeoutSeconds,
      extra: ["-c", config.packetCount.toString()],
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
