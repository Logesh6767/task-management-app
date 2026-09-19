import { TaskStats } from '@/types';
import { ListTodo, Clock, CheckCircle2, LayoutList } from 'lucide-react';

interface StatsCardsProps {
  stats: TaskStats;
}

const cards = [
  {
    label: 'Total Tasks',
    key: 'total' as keyof TaskStats,
    icon: LayoutList,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    border: 'border-blue-100',
  },
  {
    label: 'To Do',
    key: 'todo' as keyof TaskStats,
    icon: ListTodo,
    bg: 'bg-slate-50',
    iconColor: 'text-slate-600',
    border: 'border-slate-100',
  },
  {
    label: 'In Progress',
    key: 'in_progress' as keyof TaskStats,
    icon: Clock,
    bg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    border: 'border-yellow-100',
  },
  {
    label: 'Done',
    key: 'done' as keyof TaskStats,
    icon: CheckCircle2,
    bg: 'bg-green-50',
    iconColor: 'text-green-600',
    border: 'border-green-100',
  },
];

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map(({ label, key, icon: Icon, bg, iconColor, border }) => (
        <div
          key={key}
          className={`${bg} border ${border} rounded-2xl p-4 flex items-center gap-3`}
        >
          <div className={`${iconColor} bg-white rounded-xl p-2 shadow-sm`}>
            <Icon size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats[key]}</p>
            <p className="text-xs text-gray-500 font-medium">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

