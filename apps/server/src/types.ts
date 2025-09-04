export type PingResult = {
  isAlive: boolean;
  avgResponseTime: number;
  packetLossPercentage: number;
  responseTimeExceeded: number;
  packetLossExceeded: number;
  rawResult: any[];
};
