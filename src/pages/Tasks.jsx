import { useState } from 'react';
import { load, save } from '../storage/storage';

export default function Tasks() {
  const [tasks, setTasks] = useState(load('tasks', []));
  const [newTask, setNewTask] = useState('');

  function addTask() {
    if (!newTask.trim()) return;

    const updated = [...tasks, { id: Date.now(), text: newTask, done: false }];
    setTasks(updated);
    save('tasks', updated);
    setNewTask('');
  }

  function toggleTask(id) {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t,
    );
    setTasks(updated);
    save('tasks', updated);
  }

  function deleteTask(id) {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    save('tasks', updated);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Tasks</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          className="flex-1 border rounded-md px-3 py-2"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
          >
            <span
              onClick={() => toggleTask(task.id)}
              className={`cursor-pointer ${
                task.done ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.text}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
