import {useState} from 'react'
import Tasks from './pages/Tasks'
import Timer from './pages/Timer'
import Stats from './pages/Stats'
export default function App(){
const [tab,setTab]=useState('tasks')
return (
<div className='app'>
<h1>Focus Todo</h1>
<div className='nav'>
<button onClick={()=>setTab('tasks')}>Tasks</button>
<button onClick={()=>setTab('timer')}>Timer</button>
<button onClick={()=>setTab('stats')}>Stats</button>
</div>
{tab==='tasks'&&<Tasks/>}
{tab==='timer'&&<Timer/>}
{tab==='stats'&&<Stats/>}
</div>
)
}
