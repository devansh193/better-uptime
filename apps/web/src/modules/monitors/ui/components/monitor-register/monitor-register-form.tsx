import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { GlobeIcon } from "lucide-react";

export const MonitorRegisterForm = () => {
  return (
    <div className="w-full flex flex-col border border-[#282828] rounded-xl p-6 gap-y-6">
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GlobeIcon className="h-5 w-5 flex-shrink-0" />
          <span className="text-lg font-medium">What to monitor?</span>
        </div>
        <p className="text-[#A1A1A1] text-sm">
          Configure the target and method you want to monitor.
        </p>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-1 flex-col gap-y-2">
            <Label htmlFor="monitor-name" className="text-md">
              Name
            </Label>
            <Input
              id="monitor-name"
              placeholder="My Website Monitor"
              className="bg-input border-border"
            />
          </div>

          <div className="flex flex-1 flex-col gap-y-2">
            <Label htmlFor="monitor-type" className="text-md">
              Type
            </Label>
            <Select defaultValue="https">
              <SelectTrigger className="bg-input border-border w-35">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="https">HTTPS</SelectItem>
                <SelectItem value="tcp">TCP</SelectItem>
                <SelectItem value="ping">Ping</SelectItem>
                <SelectItem value="docker">Docker</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="">
          <div className="flex flex-1 flex-col gap-y-2">
            <Label htmlFor="monitor-name" className="text-md">
              URL to monitor
            </Label>
            <Input
              id="url-to-monitor"
              placeholder="https://api.artemislabs.in"
              className="bg-input border-border font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
