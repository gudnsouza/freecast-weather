import { useSettingsStore } from "@/hooks/useSettingsStore";
import { lightTheme } from "@/hooks/useThemeStore";
import { getDtHour } from "@/utils/get-dt-hour";
import { getWeekday } from "@/utils/get-weekday";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TChartData = { min?: number; max?: number; temp?: number; dt: number };
type TChartProps = {
  data: TChartData[];
  mode: "days" | "hours";
};

export function TemperatureChart({ data, mode }: TChartProps) {
  const { unitsSuffix, timeFormat } = useSettingsStore();
  const formattedData = data.map((item) => {
    const label =
      mode === "days"
        ? getWeekday(new Date(item.dt * 1000))
        : getDtHour(
            new Date(item.dt * 1000),
            timeFormat === "24h" ? true : false
          );

    return {
      ...item,
      label,
      temp: mode === "hours" ? item.temp : undefined,
    };
  });

  const tooltipStyle = {
    backgroundColor: "#000",
    borderColor: lightTheme.accent,
    borderWidth: "1px",
    borderRadius: "5px",
    color: "#fff",
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={formattedData}>
        <defs>
          <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={lightTheme.yellow} stopOpacity={0.8} />
            <stop offset="95%" stopColor={lightTheme.yellow} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={lightTheme.accent} stopOpacity={0.8} />
            <stop offset="95%" stopColor={lightTheme.accent} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={lightTheme.accent} stopOpacity={0.8} />
            <stop offset="95%" stopColor={lightTheme.accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="label"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}°${unitsSuffix}`}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend />
        {mode === "days" ? (
          <>
            <Area
              type="monotone"
              dataKey="max"
              stroke={lightTheme.yellow}
              fillOpacity={1}
              fill="url(#colorMax)"
            />
            <Area
              type="monotone"
              dataKey="min"
              stroke={lightTheme.accent}
              fillOpacity={1}
              fill="url(#colorMin)"
            />
          </>
        ) : (
          <Area
            type="monotone"
            dataKey="temp"
            stroke={lightTheme.accent}
            fillOpacity={1}
            fill="url(#colorTemp)"
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
