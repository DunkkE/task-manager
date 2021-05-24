import {useContext} from 'react'
import Task from './Task'
import {ThingsProvider} from './thingsContext'
import ThingsContext from './thingsContext'


const Tasks = ({onDelete, onToggle}) => {
    const tasks = ThingsProvider.value
    const tasksTest = ThingsContext.Provider.value
    const test = () => {
        console.log("Logging tasks")
        console.log(tasks)

    }
    return (
        <>
            {tasks !== undefined && tasks.map((task) => (<Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>))}
            {test()}
        </>
    )
}

export default Tasks
