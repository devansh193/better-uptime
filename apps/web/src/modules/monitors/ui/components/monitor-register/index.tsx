import { MonitorRegisterForm } from "./monitor-register-form";
import { MonitorRegisterHeader } from "./monitor-register-header";

export const MonitorRegister = () => {
  return (
    <div className="flex flex-col w-full p-4 gap-y-2">
      <MonitorRegisterHeader />
      <MonitorRegisterForm />
    </div>
  );
};
