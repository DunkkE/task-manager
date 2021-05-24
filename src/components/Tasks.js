import {useContext} from 'react'
import Task from './Task'
import ThingsContext from './thingsContext'


const Tasks = () => {
    const tasks = useContext(ThingsContext)
    const test = () => {
        console.log("Logging tasks")
        console.log(tasks)

    }
    return (
        <>
            {tasks['tasks'] !== undefined && tasks.tasks.map((task) => (<Task key={task.id} task={task}/>))}
            {test()}
        </>
    )
}

export default Tasks
