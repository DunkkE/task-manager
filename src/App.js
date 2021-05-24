import React from 'react';
import {useState, useEffect, useContext} from 'react'
import AddTask from './components/AddTask'
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import About from './components/About'
import Footer from './components/Footer'
import {ThingsProvider} from './components/thingsContext' 
import ThingsContext from './components/thingsContext'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)

  const sfy = (obj) => {
    console.log((JSON.stringify(obj)));
  }
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
  console.log("reminder toggled")
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
}
const onShowAdd = () => {
    //sfy(testContext)
    setShowAddTask(!showAddTask)
    console.log(showAddTask)
    
}

const onHide = () => {
  console.log("test")
  setShowAddTask(false)

}


  return (
    <Router>
      <ThingsProvider value={{'tasks': tasks, 'deleteFunc': deleteTask, 'toggleFunc': toggleReminder}}>
      <div className="container">
        <Header title='Table Test' onClick={onShowAdd}/>
        
        <Route path='/' exact render={(props)=> (
          <>
          <Tasks/>
          <AddTask onAdd={addTask} showAddTask={showAddTask} onHide={onHide} />
          </>
        )}/>
        <Route path='/about' component={About}/>
        <Footer/>
        
      </div>
      </ThingsProvider>
    </Router>

  );
}

export default App;
