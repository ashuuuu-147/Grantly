import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import { BaseCard, CardHeader, CardTitle, Badge } from '../ui';
import { useApp } from '../../context/AppContext';

export const ApplicationAnalytics = () => {
  const { applications, scholarships } = useApp();
  const [activeChart, setActiveChart] = useState('status'); // 'status' | 'categories' | 'progress'

  // 1. Applications by status data
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }));

  const STATUS_COLORS = {
    'In Progress': '#F28C78', // Coral
    'Submitted': '#438B70', // Success Green
    'Approved': '#E8BF76', // Gold
    'Saved': '#DB695C', // Primary
    'Rejected': '#C65B55', // Danger
  };

  // 2. Scholarship categories distribution
  const categoryCounts = scholarships.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.keys(categoryCounts).map((cat) => ({
    category: cat.split(' ')[0], // short name
    fullName: cat,
    grants: categoryCounts[cat],
  }));

  // 3. Application progress tracking data
  const progressData = applications.map((app) => ({
    name: app.title.split(' ')[0] + ' ' + (app.title.split(' ')[1] || ''),
    progress: app.progress || 0,
    amount: (app.awardAmount || app.amount || 0) / 1000,
  }));

  return (
    <BaseCard className="p-6">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <CardTitle>Scholarship Analytics & Application Pipeline</CardTitle>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Real-time visual breakdown of your active grant milestones and catalog categories
          </p>
        </div>

        {/* Chart Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[var(--surface-secondary)]/50 border border-[var(--border)]">
          <button
            onClick={() => setActiveChart('status')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              activeChart === 'status'
                ? 'bg-[var(--primary)] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            By Status
          </button>
          <button
            onClick={() => setActiveChart('categories')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              activeChart === 'categories'
                ? 'bg-[var(--primary)] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveChart('progress')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              activeChart === 'progress'
                ? 'bg-[var(--primary)] text-white shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Progress %
          </button>
        </div>
      </CardHeader>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {activeChart === 'status' ? (
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.name] || '#F28C78'}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  borderRadius: '12px',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          ) : activeChart === 'categories' ? (
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.6} />
              <XAxis dataKey="category" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  borderRadius: '12px',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="grants" fill="var(--coral)" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.6} />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  borderRadius: '12px',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="progress"
                stroke="var(--primary)"
                fill="var(--peach-tint)"
                strokeWidth={2.5}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </BaseCard>
  );
};

export default ApplicationAnalytics;

