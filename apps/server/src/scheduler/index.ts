import type { MonitorJob } from "@/types";
import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis();
const queue = new Queue("monitor", { connection });

export async function addMonitorJob(job: MonitorJob) {
  try {
    const { name, type, interval, data } = job;
    const jobId = `monitor:${type}:${name}`;
    const payload = {
      task: name,
      type,
      data,
    };
    const options = {
      jobId,
      repeat: { every: interval },
      removeOnComplete: true,
      removeOnFail: false,
      attempts: 3,
      backoff: {
        type: "exponential" as const,
        delay: 5000,
      },
    };
    const queueJob = await queue.add(name, payload, options);
    return queueJob;
  } catch (error) {
    console.log("Failed to add monitor job.", error);
  }
}

export async function removeMonitorJob(jobId: string) {
  try {
    await queue.remove(jobId);
    console.log(`Removed monitor job ${jobId}`);
  } catch (error) {
    console.log(error);
  }
}
