import { Worker, Job } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis();

const worker = new Worker("my-cron-job", async () => {});
