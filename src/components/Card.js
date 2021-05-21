import {FaTimes} from 'react-icons/fa'
import './Card.css'
const Card = ({task, onDelete, onToggle}) => {
    
    return (
        <div 
        className={
            `card-container ${task.reminder ? 'reminder' : ''}`
        } 
        onDoubleClick={
            () => onToggle(task.id)
            }
        >
            <div 
            className='card-title'>
                <h3>
                    {task.text}
                </h3>
            </div>
            <div 
            className='card-body' 
            
            >
                <p>
                    {task.day}
                    <FaTimes className="delete-button" onClick={() => onDelete(task.id)} style={{color: 'red', cursor:'pointer'}}/>
                </p>
                
            </div>
        </div>
    )
}

export default Card
