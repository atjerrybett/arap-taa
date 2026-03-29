'use client';

import { BarChart3, Users, Zap, Shield } from 'lucide-react';

export function Stats() {
  const stats = [
    {
      label: 'Total Members',
      value: '25+',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      label: 'Generations',
      value: '5',
      icon: BarChart3,
      color: 'text-green-500',
    },
    {
      label: 'Houses',
      value: '3',
      icon: Shield,
      color: 'text-amber-500',
    },
    {
      label: 'Connections',
      value: '∞',
      icon: Zap,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-6 bg-white dark:bg-earth-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <stat.icon className={`w-8 h-8 mb-3 ${stat.color}`} />
          <p className="text-2xl font-bold text-earth-900 dark:text-earth-100">
            {stat.value}
          </p>
          <p className="text-xs text-earth-500 dark:text-earth-400 mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
