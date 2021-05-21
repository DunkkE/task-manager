import Card from './Card'

const Tasks = ({tasks, onDelete, onToggle}) => {
    
    return (
        <>
            {tasks.map((task) => (<Card key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>))}
        </>
    )
}

export default Tasks
