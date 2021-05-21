import React from 'react';
import {useState, useEffect} from 'react'
import AddTask from './components/AddTask'
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import About from './components/About'
import Footer from './components/Footer'
function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  var [tasks, setTasks] = useState([])
  useEffect(()=> {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
      getTasks()
  }, [])

  const fetchTasks = async()=> {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async(id)=> {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }
const deleteTask = async(id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })
  setTasks(tasks.filter((task) => task.id !== id))

}

const addTask = async(task) => {
  const res = await fetch(`http://localhost:5000/tasks/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  const data = await res.json()
  setTasks([...tasks,data])
}

const toggleReminder = async(id) => {
  const toggleTask = await fetchTask(id)
const updateTask = {...toggleTask, reminder: !toggleTask.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updateTask)
  })

  const data = await res.json()
  setTasks(tasks.map((task) => task.id=== id ? {...task, reminder: data.reminder} : task))
}
const onShowAdd = () => {
    setShowAddTask(!showAddTask)
}


  return (
    <Router>
      <div className="container">
        <Header title='Table Test' onClick={onShowAdd}/>
        
        <Route path='/' exact render={(props)=> (
          <>
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
          {showAddTask && <AddTask onAdd={addTask}/>}
          </>
        )}/>
        <Route path='/about' component={About}/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
