export default function TaskItem({task,onToggle,onDelete}){
return (
<div className='task'>
<input type='checkbox' checked={task.done} onChange={()=>onToggle(task.id)}/>
<span className={task.done?'done':''}>{task.text}</span>
<button onClick={()=>onDelete(task.id)}>x</button>
</div>
)
}
