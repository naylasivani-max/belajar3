import React from 'react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer } from
'recharts';
export interface ForecastPoint {
  day: number;
  actual: number | null;
  forecast: number | null;
}
interface ForecastChartProps {
  data: ForecastPoint[];
  budgetLimit: number;
}
const shortRp = (v: number) => {
  if (v >= 1000000) return `Rp ${(v / 1000000).toFixed(1).replace('.0', '')}jt`;
  if (v >= 1000) return `Rp ${Math.round(v / 1000)}k`;
  return `Rp ${v}`;
};
const fullRp = (v: number) =>
new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}).format(v);
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || payload.length === 0) return null;
  const actual = payload.find((p: any) => p.dataKey === 'actual')?.value;
  const forecast = payload.find((p: any) => p.dataKey === 'forecast')?.value;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 px-4 py-3 min-w-[180px]">
      <p className="font-bold text-slate-900 mb-1.5">Tgl {label}</p>
      {forecast != null &&
      <p className="text-sm text-slate-400">
          forecast : <span className="font-medium">{fullRp(forecast)}</span>
        </p>
      }
      {actual != null &&
      <p className="text-sm text-indigo-600">
          actual : <span className="font-semibold">{fullRp(actual)}</span>
        </p>
      }
    </div>);

};
export const ForecastChart = ({ data, budgetLimit }: ForecastChartProps) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            left: 4,
            bottom: 4
          }}>
          
          <defs>
            <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#e2e8f0" />
          
          <XAxis
            dataKey="day"
            ticks={[1, 5, 10, 15, 20, 25, 30]}
            tick={{
              fontSize: 12,
              fill: '#94a3b8'
            }}
            axisLine={false}
            tickLine={false} />
          
          <YAxis
            tickFormatter={shortRp}
            tick={{
              fontSize: 11,
              fill: '#94a3b8'
            }}
            axisLine={false}
            tickLine={false}
            width={56} />
          
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: '#94a3b8',
              strokeWidth: 1
            }} />
          

          <ReferenceLine
            y={budgetLimit}
            stroke="#ef4444"
            strokeDasharray="6 4"
            label={{
              value: 'Batas Budget',
              position: 'insideTopRight',
              fill: '#ef4444',
              fontSize: 12
            }} />
          

          {/* Forecast (dashed, grey) */}
          <Area
            type="monotone"
            dataKey="forecast"
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="6 5"
            fill="url(#forecastFill)"
            connectNulls
            dot={false}
            activeDot={{
              r: 4,
              fill: '#94a3b8'
            }} />
          
          {/* Actual (solid, indigo) */}
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#4f46e5"
            strokeWidth={2.5}
            fill="url(#actualFill)"
            connectNulls
            dot={false}
            activeDot={{
              r: 5,
              fill: '#4f46e5',
              stroke: '#fff',
              strokeWidth: 2
            }} />
          
        </ComposedChart>
      </ResponsiveContainer>
    </div>);

};