import {FaTimes} from 'react-icons/fa'
import {Card, Modal} from 'react-bootstrap'
const Task = ({task, onDelete, onToggle}) => {
    return (
        <Card
        onDoubleClick={() => onToggle(task.id)}>
            <Card.Header>
                <Card.Title>
                    {task.text} 
                    <FaTimes 
                    onClick={() => onDelete(task.id)}
                    style={{color: 'red', cursor:'pointer', float:'right'}}
                    />
                </Card.Title>
            </Card.Header>
            <Card.Body>{task.day}</Card.Body>
            
        </Card>
    )
}

export default Task
