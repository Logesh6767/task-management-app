'use client';

import { useState } from 'react';
import { Task, TaskStatus } from '@/types';
import {
  STATUS_COLORS,
  STATUS_LABELS,
  PRIORITY_COLORS,
  PRIORITY_LABELS,
  PRIORITY_DOT,
  formatDate,
  isOverdue,
} from '@/lib/utils';
import { Calendar, Pencil, Trash2, ChevronDown } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const STATUS_OPTIONS: TaskStatus[] = ['todo', 'in_progress', 'done'];

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const overdue = isOverdue(task.due_date) && task.status !== 'done';

  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 hover:shadow-md transition-shadow group">
      {/* Priority + Status */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${PRIORITY_DOT[task.priority]}`} />
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
        </div>

        {/* Status dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[task.status]}`}
          >
            {STATUS_LABELS[task.status]}
            <ChevronDown size={11} />
          </button>

          {showStatusMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden min-w-[120px]">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onStatusChange(task.id, s);
                    setShowStatusMenu(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-xs font-medium hover:bg-gray-50 ${
                    task.status === s ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <p className={`text-sm font-semibold text-gray-800 mb-1 leading-snug ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}>
        {task.title}
      </p>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-500 mb-2.5 line-clamp-2">{task.description}</p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2.5">
          {task.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md font-medium">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer: due date + actions */}
      <div className="flex items-center justify-between mt-2">
        {task.due_date ? (
          <div className={`flex items-center gap-1 text-xs ${overdue ? 'text-red-500' : 'text-gray-400'}`}>
            <Calendar size={11} />
            {formatDate(task.due_date)}
            {overdue && <span className="font-semibold">· Overdue</span>}
          </div>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
            title="Edit task"
          >
            <Pencil size={13} />
          </button>
          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onDelete(task.id)}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded-lg font-medium"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs text-gray-400 px-1"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
              title="Delete task"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
