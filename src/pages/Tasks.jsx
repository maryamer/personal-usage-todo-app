import { useEffect, useState } from 'react';
import TaskItem from '../components/TaskItem';
import { load, save } from '../storage/storage';

export default function Tasks() {
  const [tasks, setTasks] = useState(load('tasks', []));
  const [text, setText] = useState('');

  useEffect(() => save('tasks', tasks), [tasks]);

  const add = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: text.trim(), done: false }]);
    setText('');
  };

  const toggle = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const del = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <div>
      <h2>Tasks</h2>
      <div className="row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task"
        />
        <button onClick={add}>Add</button>
      </div>

      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={toggle} onDelete={del} />
      ))}
    </div>
  );
}
