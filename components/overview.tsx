'use client';

import { FC } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface OverviewProps {
  data: any[];
}

const Overview: FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart data={data}>
        <XAxis
          axisLine={false}
          dataKey="name"
          fontSize={12}
          stroke="#888888"
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          fontSize={12}
          stroke="#888888"
          tickFormatter={(value) => `$${value}`}
          tickLine={false}
        />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
