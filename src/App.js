import React from 'react';
import {useState, useEffect} from 'react'
import AddTask from './components/AddTask'
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import About from './components/About'
import Footer from './components/Footer'
import {ThingsProvider} from './components/thingsContext' 
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const testContext = React.createContext("blah")
  const [showAddTask, setShowAddTask] = useState(false)
  const sfy = (obj) => {
    console.log((JSON.stringify(obj)));
  }
  useEffect(()=> {
    const getTasks = async () => {
      //sfy(testContext)
      console.log("before")
      sfy(ThingsProvider.value)
      const tasksFromServer = await fetchTasks()
      ThingsProvider.value = tasksFromServer
      console.log("after")
      sfy(ThingsProvider.value)
      
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
  ThingsProvider.value = ThingsProvider.value.filter((task) => task.id !== id)
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
  ThingsProvider.value = [...ThingsProvider.value,data]
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
      <div className="container">
        <Header title='Table Test' onClick={onShowAdd}/>
        
        <Route path='/' exact render={(props)=> (
          <>
          <Tasks onDelete={deleteTask} onToggle={toggleReminder}/>
          <AddTask onAdd={addTask} showAddTask={showAddTask} onHide={onHide} />
          </>
        )}/>
        <Route path='/about' component={About}/>
        <Footer/>
        
      </div>
    </Router>

  );
}

export default App;
