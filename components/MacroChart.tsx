import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { NutritionalData, MacroChartData } from '../types';

interface MacroChartProps {
  data: NutritionalData;
}

const MacroChart: React.FC<MacroChartProps> = ({ data }) => {
  const chartData: MacroChartData[] = [
    { name: 'Proteína', value: data.protein, fill: '#3b82f6' }, // Blue
    { name: 'Carboidratos', value: data.carbs, fill: '#ef4444' }, // Red
    { name: 'Gorduras', value: data.fat, fill: '#eab308' }, // Yellow
  ];

  // Filter out zero values to avoid ugly empty charts
  const activeData = chartData.filter(d => d.value > 0);

  if (activeData.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-400">Sem dados de macros</div>;
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={activeData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {activeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}g`, '']}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MacroChart;