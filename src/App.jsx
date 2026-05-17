import { useState } from 'react';
import Stats from './pages/Stats';
import Tasks from './pages/Tasks';
import Timer from './pages/Timer';

export default function App() {
  const [tab, setTab] = useState('tasks');

  const navButton = (name, label) => (
    <button
      onClick={() => setTab(name)}
      className={`px-4 py-2 rounded-lg font-medium transition 
      ${
        tab === name
          ? 'bg-indigo-600 text-white shadow'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* App container */}
      <div className="w-full max-w-4xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Focus Todo
        </h1>

        {/* Navigation */}
        <div className="flex justify-center gap-3 mb-8 bg-gray-50 p-3 rounded-xl shadow-sm border">
          {navButton('tasks', 'Tasks')}
          {navButton('timer', 'Timer')}
          {navButton('stats', 'Stats')}
        </div>

        {/* Page content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          {tab === 'tasks' && <Tasks />}
          {tab === 'timer' && <Timer />}
          {tab === 'stats' && <Stats />}
        </div>
      </div>
    </div>
  );
}
