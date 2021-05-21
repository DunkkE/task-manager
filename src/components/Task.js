import {FaTimes} from 'react-icons/fa'
import Card from './Card'
const Task = ({task, onDelete, onToggle}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FaTimes onClick={() => onDelete(task.id)} style={{color: 'red', cursor:'pointer'}}/></h3>
            <p>{task.day}</p>
            <Card task={task}/>
            
        </div>
    )
}

export default Task
