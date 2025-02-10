"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    subject: "Mathematics",
    score: 85,
  },
  {
    subject: "Physics",
    score: 78,
  },
  {
    subject: "Chemistry",
    score: 90,
  },
  {
    subject: "Biology",
    score: 88,
  },
  {
    subject: "English",
    score: 92,
  },
];

export function StudentPerformance() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="subject"
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
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="score"
          stroke="currentColor"
          strokeWidth={2}
          dot={{ strokeWidth: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
