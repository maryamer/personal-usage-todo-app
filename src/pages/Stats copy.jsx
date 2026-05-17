// src/pages/Stats.jsx (or wherever your Stats component is located)

import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { load, save } from '../storage/storage'; // Assuming load/save are for localStorage
import { supabase } from '../supabase'; // Import your Supabase client

// Helper functions (keep these as they are)
function formatMinutes(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  if (h > 0) return `${h}h ${m > 0 ? m + 'm' : ''}`;
  return `${m}m`;
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

export default function Stats() {
  // Initialize sessions from localStorage initially for immediate UI feedback
  // The restoreFromSupabase will overwrite this if data exists there
  const [sessions, setSessions] = useState(load('sessions', []));
  const [tasks, setTasks] = useState(load('tasks', [])); // Also load tasks
  const [pomodoroDuration, setPomodoroDuration] = useState(
    load('pomodoroDuration', null),
  ); // Load duration

  const [mode, setMode] = useState('week');

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedWeek, setSelectedWeek] = useState(getWeekNumber(new Date()));

  // --- Fetch initial data from Supabase on component mount ---
  useEffect(() => {
    // Try to restore from Supabase first if it exists
    restoreFromSupabase().then(() => {
      // If restore was successful, state is updated.
      // If no data in Supabase, restoreFromSupabase won't update state,
      // so we ensure localStorage data is loaded if Supabase restore fails or finds nothing.
      if (load('sessions', []).length === 0 && load('tasks', []).length === 0) {
        console.log('No Supabase backup found, using localStorage data.');
        setSessions(load('sessions', []));
        setTasks(load('tasks', []));
        setPomodoroDuration(load('pomodoroDuration', null));
      } else {
        console.log('Data loaded/restored from Supabase or localStorage.');
      }
    });
  }, []); // Empty dependency array means this runs once on mount

  // -------- BACKUP/RESTORE FUNCTIONS --------

  // Function to backup current localStorage data to Supabase
  async function backupToSupabase() {
    const sessionsData = load('sessions', []);
    const tasksData = load('tasks', []);
    const pomodoroDurationData = load('pomodoroDuration', null);

    const backupData = {
      sessions: sessionsData,
      tasks: tasksData,
      pomodoroDuration: pomodoroDurationData,
    };

    console.log('Backing up:', backupData);

    const { error } = await supabase.from('backups').insert([
      {
        data: backupData,
        // Supabase automatically adds 'created_at' if the column exists
      },
    ]);

    if (error) {
      console.error('Error backing up to Supabase:', error);
      alert('Failed to backup to Supabase');
      return;
    }

    alert('Backup successfully saved to Supabase!');
  }

  // Function to restore data from the latest Supabase backup to localStorage and component state
  async function restoreFromSupabase() {
    console.log('Attempting to restore from Supabase...');
    const { data, error } = await supabase
      .from('backups')
      .select('data')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error restoring from Supabase:', error);
      alert('Failed to restore from Supabase');
      return;
    }

    if (!data || !data.data) {
      console.log('No backup found in Supabase.');
      // If no backup found, ensure component state reflects localStorage
      setSessions(load('sessions', []));
      setTasks(load('tasks', []));
      setPomodoroDuration(load('pomodoroDuration', null));
      return;
    }

    const backup = data.data; // This is the JSON object { sessions, tasks, pomodoroDuration }

    console.log('Restoring from backup:', backup);

    // Save to localStorage
    save('sessions', backup.sessions || []);
    save('tasks', backup.tasks || []);
    save('pomodoroDuration', backup.pomodoroDuration ?? null);

    // Update component state
    setSessions(backup.sessions || []);
    setTasks(backup.tasks || []);
    setPomodoroDuration(backup.pomodoroDuration ?? null);

    alert('Backup successfully restored from Supabase!');
  }

  // --- Chart Data Calculation ---
  const chartData = useMemo(() => {
    let labels = [];
    let values = [];

    if (mode === 'year') {
      labels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      values = new Array(12).fill(0);

      sessions.forEach((s) => {
        const d = new Date(s.date);
        if (d.getFullYear() === selectedYear) {
          values[d.getMonth()] += s.duration;
        }
      });
    } else if (mode === 'month') {
      const daysInMonth = new Date(
        selectedYear,
        selectedMonth + 1,
        0,
      ).getDate();
      for (let i = 1; i <= daysInMonth; i++) labels.push(i.toString());
      values = new Array(daysInMonth).fill(0);

      sessions.forEach((s) => {
        const d = new Date(s.date);
        if (
          d.getFullYear() === selectedYear &&
          d.getMonth() === selectedMonth
        ) {
          values[d.getDate() - 1] += s.duration;
        }
      });
    } else if (mode === 'week') {
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      values = new Array(7).fill(0);

      sessions.forEach((s) => {
        const d = new Date(s.date);
        if (
          d.getFullYear() === selectedYear &&
          getWeekNumber(d) === selectedWeek
        ) {
          const index = (d.getDay() + 6) % 7; // Monday is 0, Sunday is 6
          values[index] += s.duration;
        }
      });
    }

    return { labels, values };
  }, [mode, selectedYear, selectedMonth, selectedWeek, sessions]); // sessions is now updated from Supabase/localStorage

  // -------- DATA INDICATORS --------
  // These recalculate based on the 'sessions' state, which is now managed
  const yearsWithData = useMemo(() => {
    const set = new Set();
    sessions.forEach((s) => set.add(new Date(s.date).getFullYear()));
    return set;
  }, [sessions]);

  const monthsWithData = useMemo(() => {
    const set = new Set();
    sessions.forEach((s) => {
      const d = new Date(s.date);
      if (d.getFullYear() === selectedYear) set.add(d.getMonth());
    });
    return set;
  }, [sessions, selectedYear]);

  const weeksWithData = useMemo(() => {
    const set = new Set();
    sessions.forEach((s) => {
      const d = new Date(s.date);
      if (d.getFullYear() === selectedYear) set.add(getWeekNumber(d));
    });
    return set;
  }, [sessions, selectedYear]);

  // -------- CHART OPTIONS --------
  const maxDataValue = Math.max(...chartData.values, 0);
  const yAxisMax = Math.max(1200, maxDataValue + 60); // Ensure a minimum height

  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: true },
    },
    colors: ['#6366f1'], // Indigo color
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '65%',
      },
    },
    xaxis: {
      categories: chartData.labels,
    },
    yaxis: {
      min: 0,
      max: yAxisMax,
      tickAmount: 5,
      labels: {
        formatter: (val) => formatMinutes(val),
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      followCursor: true,
      y: {
        formatter: (val) => formatMinutes(val),
      },
    },
    dataLabels: { enabled: false },
  };

  const series = [
    {
      name: 'Focus Time',
      data: chartData.values,
    },
  ];

  const years = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i); // Show last 5 years + current year + next year

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Productivity Stats
      </h2>

      {/* backup buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={backupToSupabase}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Backup to Supabase
        </button>

        <button
          onClick={restoreFromSupabase}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Restore from Supabase
        </button>
      </div>

      {/* mode buttons */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setMode('week')}
          className={`px-4 py-2 rounded-md border transition duration-200 ${
            mode === 'week'
              ? 'bg-indigo-500 text-white border-indigo-500'
              : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
          }`}
        >
          Weekly
        </button>

        <button
          onClick={() => setMode('month')}
          className={`px-4 py-2 rounded-md border transition duration-200 ${
            mode === 'month'
              ? 'bg-indigo-500 text-white border-indigo-500'
              : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
          }`}
        >
          Monthly
        </button>

        <button
          onClick={() => setMode('year')}
          className={`px-4 py-2 rounded-md border transition duration-200 ${
            mode === 'year'
              ? 'bg-indigo-500 text-white border-indigo-500'
              : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
          }`}
        >
          Yearly
        </button>
      </div>

      {/* selectors */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => {
              const year = parseInt(e.target.value);
              setSelectedYear(year);
              // Reset month/week if the year changes and data isn't available
              if (mode === 'month' && !monthsWithData.has(selectedMonth)) {
                setSelectedMonth(0); // Default to Jan if current month has no data
              }
              if (mode === 'week' && !weeksWithData.has(selectedWeek)) {
                setSelectedWeek(1); // Default to Week 1 if current week has no data
              }
            }}
            className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {years.map((y) => (
              <option
                key={y}
                value={y}
                className={yearsWithData.has(y) ? 'font-semibold' : ''}
              >
                {y}
              </option>
            ))}
          </select>
        </div>

        {mode === 'month' && (
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {[
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ].map((m, i) => (
                <option
                  key={i}
                  value={i}
                  className={monthsWithData.has(i) ? 'font-semibold' : ''}
                >
                  {m}
                </option>
              ))}
            </select>
          </div>
        )}

        {mode === 'week' && (
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Week</label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
              className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {Array.from({ length: 53 }, (_, i) => (
                <option
                  key={i + 1}
                  value={i + 1}
                  className={weeksWithData.has(i + 1) ? 'font-semibold' : ''}
                >
                  Week {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <Chart options={options} series={series} type="bar" height={400} />
      </div>
    </div>
  );
}
