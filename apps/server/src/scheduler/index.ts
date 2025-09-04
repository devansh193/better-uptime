import { Queue } from "bullmq";
import IORedis from "ioredis";

interface MonitorJob {
  name: string;
  interval: number;
  type: string;
  data: Record<string, any>[];
}

const connection = new IORedis();
const queue = new Queue("monitor", { connection });

export async function addMonitorJob({
  name,
  interval,
  data,
  type,
}: MonitorJob) {
  await queue.add(
    name,
    { task: name, ...data },
    { repeat: { every: interval }, removeOnComplete: true }
  );
  console.log(`✅ Added dynamic job "${name}" every ${interval / 1000}s`);
}
