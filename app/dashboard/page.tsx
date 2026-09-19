'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Task, TaskStats, TaskFormData, TaskStatus } from '@/types';
import Navbar from '@/components/Navbar';
import StatsCards from '@/components/StatsCards';
import TaskBoard from '@/components/TaskBoard';
import TaskModal from '@/components/TaskModal';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
  const supabase = createClient();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ── fetch tasks ──────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterStatus !== 'all') params.set('status', filterStatus);
    if (searchQuery) params.set('search', searchQuery);

    const res = await fetch(`/api/tasks?${params.toString()}`);
    const json = await res.json();
    if (json.data) setTasks(json.data);
    setLoading(false);
  }, [filterStatus, searchQuery]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ── real-time subscription (Supabase Realtime / WebSockets) ──
  useEffect(() => {
    const channel = supabase
      .channel('tasks-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        () => {
          fetchTasks(); // refetch on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, fetchTasks]);

  // ── stats ────────────────────────────────────────────────
  const stats: TaskStats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  };

  // ── CRUD handlers ────────────────────────────────────────
  const handleCreate = async (data: TaskFormData) => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setIsModalOpen(false);
    fetchTasks();
  };

  const handleUpdate = async (id: string, data: TaskFormData) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Track and manage your work items
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl transition text-sm"
          >
            <Plus size={18} />
            New Task
          </button>
        </div>

        {/* Stats */}
        <StatsCards stats={stats} />

        {/* Filter tabs */}
        <div className="flex gap-2 mt-8 mb-6">
          {(['all', 'todo', 'in_progress', 'done'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                filterStatus === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {s === 'all' ? 'All' : s === 'in_progress' ? 'In Progress' : s === 'todo' ? 'To Do' : 'Done'}
            </button>
          ))}
        </div>

        {/* Task board */}
        <TaskBoard
          tasks={tasks}
          loading={loading}
          onEdit={(task) => setEditingTask(task)}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </main>

      {/* Create modal */}
      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      {/* Edit modal */}
      {editingTask && (
        <TaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSubmit={(data) => handleUpdate(editingTask.id, data)}
        />
      )}
    </div>
  );
}
