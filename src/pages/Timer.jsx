import { useEffect, useState } from 'react';
import { load, save } from '../storage/storage';
import { format } from '../utils/timer';

export default function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [time, setTime] = useState(minutes * 60);
  const [run, setRun] = useState(false);

  const [sessions, setSessions] = useState(load('sessions', []));

  useEffect(() => save('sessions', sessions), [sessions]);

  useEffect(() => {
    if (!run) return;

    const i = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setRun(false);
          setSessions([...sessions, { date: Date.now(), duration: minutes }]);
          return minutes * 60;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(i);
  }, [run, minutes, sessions]);

  const updateMinutes = (m) => {
    setMinutes(m);
    setTime(m * 60);
  };

  return (
    <div>
      <h2>Pomodoro</h2>

      <h1>{format(time)}</h1>

      <div className="row">
        <input
          type="number"
          value={minutes}
          min="1"
          onChange={(e) => updateMinutes(Number(e.target.value))}
        />
        <span>minutes</span>
      </div>

      <div className="row">
        <button onClick={() => setRun(true)}>Start</button>
        <button onClick={() => setRun(false)}>Pause</button>
        <button onClick={() => setTime(minutes * 60)}>Reset</button>
      </div>
    </div>
  );
}
