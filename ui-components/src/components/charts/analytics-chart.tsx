import * as React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface AnalyticsChartProps {
  data: any[];
  categories: string[];
  index: string;
  type?: "line" | "bar" | "area";
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
  loading?: boolean;
  error?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  yAxisWidth?: number;
  height?: number | string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  valueFormatter,
  colors,
}: TooltipProps<number, string> & {
  valueFormatter?: (value: number) => string;
  colors: string[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {label}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1 mt-2">
          {payload.map((category, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                />
                <span className="text-xs font-medium text-foreground">
                  {category.name}
                </span>
              </div>
              <span className="text-xs text-foreground font-bold">
                {valueFormatter
                  ? valueFormatter(category.value as number)
                  : category.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function AnalyticsChart({
  data,
  categories,
  index,
  type = "line",
  colors = ["#2563eb", "#e11d48", "#16a34a", "#d97706", "#7c3aed"],
  valueFormatter = (value: number) => `${value}`,
  className,
  loading = false,
  error,
  showLegend = true,
  showGrid = true,
  yAxisWidth = 40,
  height = 350,
}: AnalyticsChartProps) {
  const { theme } = useTheme();
  
  // Basic empty state handling
  if (loading) {
    return (
      <div className={cn("w-full flex items-center justify-center", className)} style={{ height }}>
        <Skeleton className="w-full h-full rounded-md" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "w-full flex flex-col items-center justify-center border rounded-md bg-muted/10 text-muted-foreground p-4",
          className
        )}
        style={{ height }}
      >
        <p className="text-sm font-medium text-destructive mb-1">Failed to load chart data</p>
        <p className="text-xs">{error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        className={cn(
          "w-full flex items-center justify-center border border-dashed rounded-md bg-muted/5 text-muted-foreground",
          className
        )}
        style={{ height }}
      >
        No data available
      </div>
    );
  }

  const ChartComponent = type === "bar" ? BarChart : type === "area" ? AreaChart : LineChart;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
            />
          )}
          <XAxis
            dataKey={index}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={valueFormatter}
            width={yAxisWidth}
          />
          <Tooltip
            content={
              <CustomTooltip valueFormatter={valueFormatter} colors={colors} />
            }
            cursor={{ fill: "hsl(var(--muted)/0.4)", stroke: "hsl(var(--border))", strokeDasharray: "4 4" }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ paddingTop: "10px" }}
              formatter={(value) => (
                <span className="text-sm font-medium text-foreground ml-1">
                  {value}
                </span>
              )}
            />
          )}
          {categories.map((category, idx) => {
            const color = colors[idx % colors.length];
            if (type === "bar") {
              return (
                <Bar
                  key={category}
                  dataKey={category}
                  fill={color}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
              );
            }
            if (type === "area") {
              return (
                <Area
                  key={category}
                  type="monotone"
                  dataKey={category}
                  fill={color}
                  stroke={color}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              );
            }
            return (
              <Line
                key={category}
                type="monotone"
                dataKey={category}
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            );
          })}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}