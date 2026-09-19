import { Task, TaskStatus } from '@/types';
import TaskCard from './TaskCard';
import { Loader2, ClipboardList } from 'lucide-react';

interface TaskBoardProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const COLUMNS: { status: TaskStatus; label: string; color: string }[] = [
  { status: 'todo', label: 'To Do', color: 'bg-slate-400' },
  { status: 'in_progress', label: 'In Progress', color: 'bg-blue-500' },
  { status: 'done', label: 'Done', color: 'bg-green-500' },
];

export default function TaskBoard({
  tasks,
  loading,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskBoardProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <ClipboardList size={48} className="mb-3 opacity-40" />
        <p className="font-medium text-gray-500">No tasks found</p>
        <p className="text-sm">Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {COLUMNS.map(({ status, label, color }) => {
        const columnTasks = tasks.filter((t) => t.status === status);
        return (
          <div key={status} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Column header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100">
              <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
              <h2 className="font-semibold text-gray-700 text-sm">{label}</h2>
              <span className="ml-auto bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded-full">
                {columnTasks.length}
              </span>
            </div>

            {/* Tasks */}
            <div className="p-3 space-y-2.5 min-h-[200px]">
              {columnTasks.length === 0 ? (
                <p className="text-center text-gray-400 text-xs py-8">No tasks here</p>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

