import type { httpMonitor } from "@/db/schema/http-monitor-config";
import { payloadParse } from "@/utils/payload-parse";
import { TRPCError } from "@trpc/server";
import https from "https";
import got from "got";

export async function requestHttp(monitor: httpMonitor) {
  const { url, ignoreTlsError, jsonPath, expectedValue, matchMethod, secrets } =
    monitor;
  try {
    if (!url) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "URL is required",
      });
    }
    const config = {
      headers: secrets ? { Authorization: `Bearer ${secrets}` } : undefined,
      agent: ignoreTlsError
        ? {
            https: new https.Agent({
              rejectUnauthorized: false,
            }),
          }
        : undefined,
    };
    const response = await got(url, config);
    const payload = payloadParse(response);
    const httpResponse = {
      code: response.statusCode,
      status: response.ok,
      message: response.statusMessage,
      responseTime: response.timings.phases.total || 0,
      payload: payload,
    };
    return httpResponse;
  } catch (error) {
    console.log(error);
  }
}
