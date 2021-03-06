import {FaTimes} from 'react-icons/fa'
import {Card, Button} from 'react-bootstrap'
import {useContext} from 'react'
import ThingsContext from './thingsContext'

const Task = ({task}) => {
    const context = useContext(ThingsContext)
    return (
        <Card
        onDoubleClick={() => context.toggleFunc(task.id)}>
            <Card.Header>
                <Card.Title>
                    {task.text} 
                    <FaTimes 
                    onClick={() => context.deleteFunc(task.id)}
                    style={{color: 'red', cursor:'pointer', float:'right'}}
                    />
                </Card.Title>
            </Card.Header>
            <Card.Body>
                {task.day}
                <Button onClick={() => context.stateTest([])}>test</Button>
            </Card.Body>
            
        </Card>
    )
}

export default Task
