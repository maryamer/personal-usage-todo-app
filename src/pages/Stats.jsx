import { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts'; // Assuming react-apexcharts is installed

import { load, save } from '../storage/storage'; // Assuming these functions handle localStorage
import { supabase } from '../supabase'; // Import your Supabase client

// --- Helper functions ---
function formatMinutes(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  if (h > 0) return `${h}h ${m > 0 ? m + 'm' : ''}`;
  return `${m}m`;
}

function getWeekNumber(d) {
  // Ensure input is a Date object, create one if not
  const date = d instanceof Date ? d : new Date(d);
  // Ensure date is UTC to avoid timezone issues
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
}

// --- Main Component ---
export default function Stats() {
  // Initialize state from localStorage for immediate UI feedback
  const [sessions, setSessions] = useState(load('sessions', []));
  const [tasks, setTasks] = useState(load('tasks', []));
  const [pomodoroDuration, setPomodoroDuration] = useState(
    load('pomodoroDuration', null),
  );
  const [isLoading, setIsLoading] = useState(false); // Loading state for Supabase operations

  const [mode, setMode] = useState('week');

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedWeek, setSelectedWeek] = useState(getWeekNumber(new Date()));

  // --- Effect to load initial data from Supabase or fallback to localStorage ---
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        const restored = await restoreFromSupabase(); // Attempt to restore from Supabase
        if (restored) {
          console.log('Data loaded from Supabase.');
        } else {
          // If Supabase restore didn't return data (or failed implicitly)
          console.log(
            'No Supabase backup found or failed, loading from localStorage.',
          );
          // Ensure component state reflects localStorage
          setSessions(load('sessions', []));
          setTasks(load('tasks', []));
          setPomodoroDuration(load('pomodoroDuration', null));
        }
      } catch (error) {
        console.error('Error during initialization:', error);
        alert(
          'An error occurred while loading data. Falling back to localStorage.',
        );
        // Fallback to localStorage in case of unexpected errors
        setSessions(load('sessions', []));
        setTasks(load('tasks', []));
        setPomodoroDuration(load('pomodoroDuration', null));
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []); // Run only once on mount

  // -------- BACKUP/RESTORE FUNCTIONS --------

  // --- Supabase Functions ---
  async function backupToSupabase() {
    setIsLoading(true); // Set loading state
    const backupData = {
      sessions: load('sessions', []), // Backup current localStorage state
      tasks: load('tasks', []),
      pomodoroDuration: load('pomodoroDuration', null),
    };

    console.log('Backing up to Supabase:', backupData);

    try {
      const { error } = await supabase
        .from('backups')
        .insert([{ data: backupData }]);

      if (error) {
        console.error('Error backing up to Supabase:', error);
        alert(
          `Failed to backup to Supabase: ${error.message || 'Unknown error'}.`,
        );
      } else {
        alert('Backup successfully saved to Supabase!');
      }
    } catch (err) {
      console.error('Unexpected error during Supabase backup:', err);
      alert(`An unexpected error occurred: ${err.message}.`);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }

  // Returns true if data was successfully restored, false otherwise
  async function restoreFromSupabase() {
    console.log('Attempting to restore from Supabase...');
    setIsLoading(true); // Set loading state
    try {
      const { data, error } = await supabase
        .from('backups')
        .select('data')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error restoring from Supabase:', error);
        // Handle specific Supabase errors if needed (e.g., network, auth)
        if (error.details?.includes('No rows found')) {
          console.log('No backup data found in Supabase.');
        } else {
          alert(
            `Failed to restore from Supabase: ${error.message || 'Unknown error'}.`,
          );
        }
        return false; // Indicate failure or no data found
      }

      if (!data || !data.data) {
        console.log('No backup data payload found in Supabase response.');
        return false; // No data found
      }

      const backup = data.data; // The JSON object { sessions, tasks, pomodoroDuration }
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
      return true; // Indicate success
    } catch (err) {
      console.error('Unexpected error during Supabase restore:', err);
      alert(`An unexpected error occurred: ${err.message}.`);
      return false; // Indicate failure
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }

  // --- Manual Export/Import Functions ---
  function exportData() {
    const dataToExport = {
      sessions: load('sessions', []),
      tasks: load('tasks', []),
      pomodoroDuration: load('pomodoroDuration', null),
    };

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `focus_todo_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the object URL

    alert('Data exported successfully!');
  }

  function importData(event) {
    const file = event.target.files[0];
    if (!file) {
      return; // No file selected
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        // Validate the structure (basic check)
        if (
          importedData &&
          Array.isArray(importedData.sessions) &&
          Array.isArray(importedData.tasks)
        ) {
          // Save to localStorage
          save('sessions', importedData.sessions);
          save('tasks', importedData.tasks);
          save('pomodoroDuration', importedData.pomodoroDuration ?? null);

          // Update component state
          setSessions(importedData.sessions);
          setTasks(importedData.tasks);
          setPomodoroDuration(importedData.pomodoroDuration ?? null);

          alert('Data imported successfully!');
        } else {
          alert('Invalid file format. Please select a valid backup file.');
        }
      } catch (err) {
        alert('Error parsing file. Please ensure it is a valid JSON backup.');
      }
    };
    reader.readAsText(file);
  }

  // --- Chart Data Calculation ---
  const chartData = useMemo(() => {
    let labels = [];
    let values = [];
    const currentSessions = sessions || []; // Ensure sessions is an array

    // Filter sessions based on selectedYear and mode
    const filteredSessions = currentSessions.filter((s) => {
      try {
        const sessionDate = new Date(s.date);
        if (isNaN(sessionDate.getTime())) return false; // Skip invalid dates

        const sessionYear = sessionDate.getFullYear();
        if (sessionYear !== selectedYear) return false;

        if (mode === 'month' && sessionDate.getMonth() !== selectedMonth)
          return false;
        if (mode === 'week' && getWeekNumber(sessionDate) !== selectedWeek)
          return false;

        return true;
      } catch (e) {
        console.error('Error processing session date:', s.date, e);
        return false; // Skip sessions with invalid dates
      }
    });

    // Populate labels and values based on the mode
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
      filteredSessions.forEach((s) => {
        values[new Date(s.date).getMonth()] += s.duration || 0;
      });
    } else if (mode === 'month') {
      const daysInMonth = new Date(
        selectedYear,
        selectedMonth + 1,
        0,
      ).getDate();
      for (let i = 1; i <= daysInMonth; i++) labels.push(i.toString());
      values = new Array(daysInMonth).fill(0);
      filteredSessions.forEach((s) => {
        values[new Date(s.date).getDate() - 1] += s.duration || 0;
      });
    } else if (mode === 'week') {
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      values = new Array(7).fill(0);
      filteredSessions.forEach((s) => {
        const dayOfWeek = (new Date(s.date).getDay() + 6) % 7; // Monday is 0, Sunday is 6
        values[dayOfWeek] += s.duration || 0;
      });
    }

    return { labels, values };
  }, [mode, selectedYear, selectedMonth, selectedWeek, sessions]); // Recalculate when dependencies change

  // --- Data Indicators Calculation ---
  const yearsWithData = useMemo(() => {
    const set = new Set();
    (sessions || []).forEach((s) => {
      try {
        const year = new Date(s.date).getFullYear();
        if (!isNaN(year)) set.add(year);
      } catch (e) {
        /* ignore invalid dates */
      }
    });
    return set;
  }, [sessions]);

  const monthsWithData = useMemo(() => {
    const set = new Set();
    (sessions || []).forEach((s) => {
      try {
        const sessionDate = new Date(s.date);
        if (
          !isNaN(sessionDate.getTime()) &&
          sessionDate.getFullYear() === selectedYear
        ) {
          set.add(sessionDate.getMonth());
        }
      } catch (e) {
        /* ignore invalid dates */
      }
    });
    return set;
  }, [sessions, selectedYear]);

  const weeksWithData = useMemo(() => {
    const set = new Set();
    (sessions || []).forEach((s) => {
      try {
        const sessionDate = new Date(s.date);
        if (
          !isNaN(sessionDate.getTime()) &&
          sessionDate.getFullYear() === selectedYear
        ) {
          set.add(getWeekNumber(sessionDate));
        }
      } catch (e) {
        /* ignore invalid dates */
      }
    });
    return set;
  }, [sessions, selectedYear]);

  // --- Chart Options ---
  const maxDataValue = Math.max(0, ...chartData.values); // Ensure minimum 0
  const yAxisMax = Math.max(1200, maxDataValue + 60); // Ensure a minimum chart height

  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: true },
      height: 400,
    },
    colors: ['#6366f1'], // Indigo color
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '65%',
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return formatMinutes(val);
      },
      style: {
        colors: ['#374151'],
      },
    },
    xaxis: {
      categories: chartData.labels,
      labels: {
        style: {
          colors: '#374151',
          fontSize: '12px',
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: yAxisMax,
      tickAmount: 5,
      labels: {
        formatter: (val) => formatMinutes(val),
        style: {
          colors: '#374151',
          fontSize: '12px',
        },
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
    grid: {
      borderColor: '#e5e7eb',
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 0.5,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
        },
      },
    ],
  };

  const series = [
    {
      name: 'Focus Time',
      data: chartData.values,
    },
  ];

  // Generate years for the selector, focusing on recent years
  const availableYears = Array.from(
    { length: 7 },
    (_, i) => currentYear - 5 + i,
  );

  // Calculate total minutes for the selected period
  const totalMinutesForSelectedPeriod = chartData.values.reduce(
    (sum, val) => sum + val,
    0,
  );
  const formattedTotalMinutes = formatMinutes(totalMinutesForSelectedPeriod);

  // Calculate overall stats based on all loaded sessions
  const totalSessionsOverall = sessions.length;
  const totalTasksOverall = tasks.length;
  const totalFocusTimeOverall = formatMinutes(
    sessions.reduce((total, s) => total + (s.duration || 0), 0),
  );

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Productivity Stats
      </h2>

      {/* Backup/Restore Buttons Row */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
        <button
          onClick={backupToSupabase}
          disabled={isLoading}
          className={`px-5 py-2 rounded-lg font-medium transition duration-200
                      ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          Backup to Supabase
        </button>

        <button
          onClick={restoreFromSupabase}
          disabled={isLoading}
          className={`px-5 py-2 rounded-lg font-medium transition duration-200
                      ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
        >
          Restore from Supabase
        </button>

        {/* Manual Export Button */}
        <button
          onClick={exportData}
          disabled={isLoading}
          className={`px-5 py-2 rounded-lg font-medium transition duration-200
                      ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          Export Data
        </button>

        {/* Manual Import Button - Triggers file input */}
        <label
          htmlFor="file-upload"
          className={`px-5 py-2 rounded-lg font-medium transition duration-200 cursor-pointer
                      ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
        >
          Import Data
        </label>
        <input
          id="file-upload"
          type="file"
          accept="application/json"
          onChange={importData}
          style={{ display: 'none' }} // Hide the default file input
          disabled={isLoading}
        />
      </div>

      {/* Display loading indicator if an operation is in progress */}
      {isLoading && (
        <div className="text-center py-4 text-lg font-semibold text-gray-700">
          Processing...
        </div>
      )}

      {/* Mode Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={() => setMode('week')}
          className={`px-4 py-2 rounded-md border transition duration-200 ${
            mode === 'week'
              ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
              : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setMode('month')}
          className={`px-4 py-2 rounded-md border transition duration-200 ${
            mode === 'month'
              ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
              : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setMode('year')}
          className={`px-4 py-2 rounded-md border transition duration-200 ${
            mode === 'year'
              ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
              : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
          }`}
        >
          Yearly
        </button>
      </div>

      {/* Selectors */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => {
              const year = parseInt(e.target.value);
              setSelectedYear(year);
              // Adjust month/week if the new year doesn't have data for the current selection
              if (mode === 'month' && !monthsWithData.has(selectedMonth)) {
                const availableMonths = Array.from(monthsWithData).sort(
                  (a, b) => a - b,
                );
                setSelectedMonth(
                  availableMonths.length > 0 ? availableMonths[0] : 0,
                );
              }
              if (mode === 'week' && !weeksWithData.has(selectedWeek)) {
                const availableWeeks = Array.from(weeksWithData).sort(
                  (a, b) => a - b,
                );
                setSelectedWeek(
                  availableWeeks.length > 0 ? availableWeeks[0] : 1,
                );
              }
            }}
            className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {availableYears.map((y) => (
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
            <label className="text-sm font-medium text-gray-700">Month</label>
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
            <label className="text-sm font-medium text-gray-700">Week</label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
              className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {Array.from({ length: 53 }, (_, i) => i + 1).map((weekNum) => (
                <option
                  key={weekNum}
                  value={weekNum}
                  className={weeksWithData.has(weekNum) ? 'font-semibold' : ''}
                >
                  Week {weekNum}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Chart Area */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h3 className="text-xl font-medium mb-4 text-center capitalize">
          {mode} Focus Time{' '}
          {mode === 'year'
            ? selectedYear
            : mode === 'month'
              ? `${new Date(0, selectedMonth).toLocaleString('en', { month: 'long' })} ${selectedYear}`
              : `Week ${selectedWeek}, ${selectedYear}`}
        </h3>
        {chartData.labels.length > 0 ? (
          <Chart options={options} series={series} type="bar" height={400} />
        ) : (
          <p className="text-center text-gray-500 py-20">
            No data available for the selected period.
          </p>
        )}
        <p className="text-center mt-4 text-lg font-semibold text-gray-700">
          Total Focus Time: {formattedTotalMinutes}
        </p>
      </div>

      {/* Overall Stats Summary */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h3 className="text-xl font-medium mb-4 text-center">
          Overall Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-600">Total Sessions</p>
            <p className="text-3xl font-bold">{totalSessionsOverall}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Tasks</p>
            <p className="text-3xl font-bold">{totalTasksOverall}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Focus Time</p>
            <p className="text-3xl font-bold">{totalFocusTimeOverall}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
