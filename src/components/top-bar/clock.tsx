import { useSettingsStore } from "@/hooks/useSettingsStore";
import { useEffect, useState } from "react";

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { timeFormat } = useSettingsStore();

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    const now = new Date();
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const syncTimeoutId = setTimeout(() => {
      updateTime();
      const timerId = setInterval(updateTime, 1000 * 60);
      return () => {
        clearInterval(timerId);
      };
    }, msUntilNextMinute);

    return () => {
      clearTimeout(syncTimeoutId);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: timeFormat === "24h" ? false : true,
    });
  };

  return <>{formatTime(currentTime)}</>;
};

export default Clock;
