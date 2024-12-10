import { LogItem } from "@/components/LogChart/types"
import { useMemo } from "react"
import { numberwithCommas } from "@/utils"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export interface RenderChartProps {
  items: Record<string, LogItem>
  timestamps: string[]
  biaxial?: boolean
}

export function RenderChart({ items, timestamps, biaxial }: RenderChartProps) {
  const data = useMemo(() => {
    const itemKeys = Object.keys(items)
    const valuesLength = items[itemKeys[0]].values.length

    return Array.from({ length: valuesLength }, (_, index) => {
      const entry: Record<string, number | string> = {}
      itemKeys.forEach((key) => {
        entry[key] = items[key].values[index]
      })
      entry.date = timestamps[index]
      return entry
    })
  }, [items, timestamps])

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart data={data} margin={{ right: 5, bottom: 5, left: 0, top: 10 }}>
        <XAxis dataKey={"date"} tickMargin={12} />
        <YAxis strokeWidth={0} tickMargin={6} allowDecimals={false} />
        {biaxial && (
          <YAxis
            strokeWidth={0}
            tickMargin={6}
            allowDecimals={false}
            yAxisId="right"
            orientation="right"
          />
        )}
        <Tooltip
          separator={": "}
          formatter={(item) => numberwithCommas(item as number)}
        />
        <CartesianGrid vertical={false} />
        {Object.keys(items).map((key) => {
          const item = items[key]
          return (
            <Line
              dataKey={key}
              key={key}
              name={item.label}
              stroke={item.color}
              fill={item.color}
              type={"monotone"}
              yAxisId={item.right ? "right" : undefined}
            />
          )
        })}
      </LineChart>
    </ResponsiveContainer>
  )
}
