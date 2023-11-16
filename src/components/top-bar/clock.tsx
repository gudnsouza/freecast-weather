import { useSettingsStore } from "@/hooks/useSettingsStore";
import { useEffect, useState } from "react";

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { timeFormat } = useSettingsStore();

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60);

    return () => {
      clearInterval(timerId);
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
