import { MonitorRegister } from "@/modules/monitors/ui/components/monitor-register";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Monitor | Better Uptime",
  description: "register new monitor",
};

const Page = () => {
  return (
    <div>
      <MonitorRegister />
    </div>
  );
};
export default Page;
