import { requestHttp } from "@/service/http-monitor";
import { Worker, Job } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis();

const worker = new Worker("monitor-job", async (job: Job) => {
  const { type, ...data } = job.data;
  let result = "";
  switch (type) {
    case "http":
      {
        result = await requestHttp(data);
      }
      break;
    case "ping":
      {
        // run ping request
      }
      break;
    case "docker":
      {
        // run docker request
      }
      break;
    default: {
      console.log("Unknown monitor type.");
    }
  }
  {
    connection;
  }
});
