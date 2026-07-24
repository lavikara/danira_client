'use client';

import { useState, useEffect, useRef } from 'react';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions, ChartData } from 'chart.js';
import { useTheme } from '@/contexts/theme-context';

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
);

type ChartKind = 'bar' | 'line' | 'doughnut' | 'radar';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = any;

interface AppChartProps {
  type: ChartKind;
  data: ChartData<AnyObj>;
  options?: ChartOptions<AnyObj>;
  height?: number;
}

export function AppChart({ type, data, options = {}, height }: AppChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Use a key to force re-mount when theme changes so Chart.js picks up new colours
  const chartKey = `chart-${type}-${theme}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';
  const gridCol = isDark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)';
  const tickCol = isDark ? '#4f5a6e' : '#94a3b8';

  const needsScales = type !== 'doughnut' && type !== 'radar';

  const xBase = { grid: { display: false }, ticks: { font: { size: 11 }, color: tickCol } };
  const yBase = { grid: { color: gridCol }, ticks: { font: { size: 11 }, color: tickCol } };

  const callerX = (options as AnyObj).scales?.x ?? {};
  const callerY = (options as AnyObj).scales?.y ?? {};
  const callerExtra = Object.fromEntries(
    Object.entries((options as AnyObj).scales ?? {}).filter(([k]) => k !== 'x' && k !== 'y'),
  );
  const scales = needsScales
    ? { x: { ...xBase, ...callerX }, y: { ...yBase, ...callerY }, ...callerExtra }
    : undefined;

  const { scales: _drop, plugins: callerPlugins, ...restOptions } = options as AnyObj;

  const mergedOptions: AnyObj = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 300 },
    ...restOptions,
    plugins: { legend: { display: false }, ...callerPlugins },
    ...(scales ? { scales } : {}),
  };

  const wrapperStyle: React.CSSProperties = { height: height ?? '100%' };

  if (!mounted) {
    return <div style={wrapperStyle} className="animate-pulse rounded-lg bg-border-light" />;
  }

  return (
    <div style={wrapperStyle}>
      {type === 'bar' && <Bar key={chartKey} data={data} options={mergedOptions} />}
      {type === 'line' && <Line key={chartKey} data={data} options={mergedOptions} />}
      {type === 'doughnut' && <Doughnut key={chartKey} data={data} options={mergedOptions} />}
      {type === 'radar' && <Radar key={chartKey} data={data} options={mergedOptions} />}
    </div>
  );
}
