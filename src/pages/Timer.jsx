import { useEffect, useState } from 'react';
import { load, save } from '../storage/storage';

export default function Timer({ onSessionComplete }) {
  const defaultDuration = load('pomodoroDuration', 25);
  const [seconds, setSeconds] = useState(defaultDuration * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            onSessionComplete?.(defaultDuration);
            return defaultDuration * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Pomodoro Timer
      </h2>

      <div className="text-5xl font-bold text-indigo-600 mb-6">
        {minutes}:{secs.toString().padStart(2, '0')}
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIsRunning(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Start
        </button>

        <button
          onClick={() => setIsRunning(false)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Stop
        </button>

        <button
          onClick={() => setSeconds(defaultDuration * 60)}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
