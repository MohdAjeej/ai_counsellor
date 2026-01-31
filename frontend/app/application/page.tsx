'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { todoAPI, universityAPI, getAuthToken } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { CheckCircle, Circle, Plus, Trash2, Calendar, AlertCircle } from 'lucide-react';

interface Todo {
  id: number;
  title: string;
  description?: string;
  priority: string;
  status: string;
  due_date?: string;
  university_id?: number;
  created_at: string;
}

interface University {
  id: number;
  name: string;
}

export default function ApplicationPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lockedUniversities, setLockedUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
    university_id: undefined as number | undefined,
  });
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    if (!user.is_onboarded) {
      router.push('/onboarding');
      return;
    }
    loadData();
  }, [user, router]);

  const loadData = async () => {
    try {
      const token = getAuthToken();
      const lockedPromise = token ? universityAPI.getLocked() : Promise.resolve({ data: { data: [] } });
      const [todosRes, universitiesRes] = await Promise.all([
        todoAPI.getAll(),
        lockedPromise,
      ]);
      setTodos(todosRes.data);
      const lockedList = Array.isArray(universitiesRes.data) ? universitiesRes.data : (universitiesRes.data?.data ?? []);
      setLockedUniversities(lockedList);
      
      if (lockedList.length === 0) {
        // Generate default to-dos if none exist
        generateDefaultTodos(lockedList);
      }
    } catch (error) {
      console.error('Error loading application data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateDefaultTodos = async (universities: University[]) => {
    if (universities.length === 0) return;
    
    const defaultTodos = [
      {
        title: 'Write Statement of Purpose (SOP)',
        description: 'Draft a compelling SOP highlighting your academic background, goals, and why you chose this program',
        priority: 'high',
        university_id: universities[0].id,
      },
      {
        title: 'Request Letters of Recommendation',
        description: 'Contact professors or employers for recommendation letters',
        priority: 'high',
        university_id: universities[0].id,
      },
      {
        title: 'Prepare Transcripts',
        description: 'Request official transcripts from your current institution',
        priority: 'high',
        university_id: universities[0].id,
      },
      {
        title: 'Complete Application Form',
        description: 'Fill out the university application form with all required information',
        priority: 'medium',
        university_id: universities[0].id,
      },
      {
        title: 'Submit Application Fee',
        description: 'Pay the required application fee',
        priority: 'medium',
        university_id: universities[0].id,
      },
    ];

    try {
      for (const todo of defaultTodos) {
        await todoAPI.create(todo);
      }
      loadData();
    } catch (error) {
      console.error('Error generating default todos:', error);
    }
  };

  const getErrorMessage = (error: any, fallback: string) => {
    const detail = error?.response?.data?.detail;
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail) && detail.length > 0) {
      const messages = detail.map((d: { msg?: string }) => d.msg || JSON.stringify(d)).filter(Boolean);
      return messages.length ? messages.join('. ') : fallback;
    }
    if (detail && typeof detail === 'object') return JSON.stringify(detail);
    return fallback;
  };

  const handleAddTodo = async () => {
    if (!newTodo.title.trim()) return;

    const payload: Record<string, unknown> = {
      title: newTodo.title.trim(),
      description: newTodo.description?.trim() || undefined,
      priority: newTodo.priority,
      university_id: newTodo.university_id ?? undefined,
    };
    if (newTodo.due_date && newTodo.due_date.trim()) {
      // Backend expects ISO datetime (e.g. YYYY-MM-DDTHH:mm:ss); date input gives YYYY-MM-DD
      payload.due_date = `${newTodo.due_date.trim()}T00:00:00`;
    }

    try {
      await todoAPI.create(payload);
      setNewTodo({
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
        university_id: undefined,
      });
      setShowAddModal(false);
      loadData();
    } catch (error: any) {
      alert(getErrorMessage(error, 'Failed to create todo. Please try again.'));
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
    try {
      await todoAPI.update(todo.id, { status: newStatus });
      loadData();
    } catch (error: any) {
      alert(getErrorMessage(error, 'Failed to update todo. Please try again.'));
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    
    try {
      await todoAPI.delete(id);
      loadData();
    } catch (error: any) {
      alert(getErrorMessage(error, 'Failed to delete todo. Please try again.'));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (lockedUniversities.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-semibold text-gray-900">No Locked Universities</h2>
            </div>
            <p className="text-gray-700 mb-4">
              You need to lock at least one university before accessing application guidance.
            </p>
            <a
              href="/universities"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Discover & Lock Universities
            </a>
          </div>
        </div>
      </div>
    );
  }

  const pendingTodos = todos.filter(t => t.status !== 'completed');
  const completedTodos = todos.filter(t => t.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Application Guidance</h1>
            <p className="text-gray-600 mt-1">Track your application tasks and deadlines</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Todo</span>
          </button>
        </div>

        {/* Progress summary */}
        {todos.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-sm font-medium text-gray-700">Application progress</span>
              <span className="text-sm font-semibold text-primary-600">
                {completedTodos.length} of {todos.length} tasks completed
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary-500 transition-all duration-300"
                style={{ width: `${todos.length ? (completedTodos.length / todos.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        {/* Task filter tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTaskFilter(tab)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                taskFilter === tab
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab === 'all' && `All (${todos.length})`}
              {tab === 'pending' && `Pending (${pendingTodos.length})`}
              {tab === 'completed' && `Completed (${completedTodos.length})`}
            </button>
          ))}
        </div>

        {/* Locked Universities */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Locked Universities</h2>
          <div className="flex flex-wrap gap-2">
            {lockedUniversities.map((uni) => (
              <span
                key={uni.id}
                className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-semibold"
              >
                {uni.name}
              </span>
            ))}
          </div>
        </div>

        {/* Pending Todos */}
        {(taskFilter === 'all' || taskFilter === 'pending') && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Pending Tasks ({pendingTodos.length})
          </h2>
          {pendingTodos.length > 0 ? (
            <div className="space-y-3">
              {pendingTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => handleToggleTodo(todo)}
                      className="mt-1 text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <Circle className="w-6 h-6" />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{todo.title}</h3>
                          {todo.description && (
                            <p className="text-gray-600 mt-1">{todo.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4 mt-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                            todo.priority
                          )}`}
                        >
                          {todo.priority.toUpperCase()}
                        </span>
                        {todo.due_date && (
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{new Date(todo.due_date).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-600">
              No pending tasks. Great job!
            </div>
          )}
        </div>
        )}

        {/* Completed Todos */}
        {(taskFilter === 'all' || taskFilter === 'completed') && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Completed Tasks ({completedTodos.length})
            </h2>
            {completedTodos.length > 0 ? (
            <div className="space-y-3">
              {completedTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="bg-gray-50 rounded-xl shadow-sm p-6 opacity-75"
                >
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => handleToggleTodo(todo)}
                      className="mt-1 text-green-600 hover:text-gray-400 transition-colors"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </button>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-600 line-through">
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className="text-gray-500 mt-1 line-through">{todo.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-600">
                No completed tasks yet.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Todo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Task</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Submit application form"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="Additional details..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={newTodo.priority}
                  onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date (optional)</label>
                <input
                  type="date"
                  value={newTodo.due_date}
                  onChange={(e) => setNewTodo({ ...newTodo, due_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {lockedUniversities.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">University (optional)</label>
                  <select
                    value={newTodo.university_id || ''}
                    onChange={(e) =>
                      setNewTodo({
                        ...newTodo,
                        university_id: e.target.value ? parseInt(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Universities</option>
                    {lockedUniversities.map((uni) => (
                      <option key={uni.id} value={uni.id}>
                        {uni.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex space-x-2 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewTodo({
                    title: '',
                    description: '',
                    priority: 'medium',
                    due_date: '',
                    university_id: undefined,
                  });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTodo}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

