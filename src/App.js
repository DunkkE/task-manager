import React from 'react';
import {useState, useEffect, useContext, useMemo} from 'react'
import AddTask from './components/AddTask'
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import About from './components/About'
import Footer from './components/Footer'
import axios from 'axios'
import ThingsContext, {ThingsProvider, useTask} from './components/thingsContext' 
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  
  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)
  
  function Test() {
    const [test,setTest] = useTask().states
    const [functions, setFunctions] = useTask().funcs
    setFunctions(funcObject)
    setTest(tasks)
    console.log(test)
    console.log(functions)
    return <></>
  }
  useEffect(()=> {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks(setTasks)
    }
      getTasks()
  }, [])

  const fetchTasks = async(func)=> {
    const res = await axios.get('http://localhost:5000/tasks').then( (result) => {
      console.log(result.data)
      func(result.data)
    })
  }

  const fetchTask = async(id, func)=> {
    const res = await axios.get(`http://localhost:5000/tasks/${id}`).then((val) => {
      func(val.data)
      return val.data
  })
  }
const deleteTask = async(id) => {
  axios.delete(`http://localhost:5000/tasks/${id}`)
  setTasks(tasks.filter((task) => task.id !== id))

}

const addTask = async(task) => {
  const res = axios.post(`http://localhost:5000/tasks/`, task)
  setTasks([...tasks,task])
}

const toggleReminder = async(id) => {
  console.log("reminder toggled")
  const afterRetrieve = (val) => {
    const updateTask = {...val, reminder: !val.reminder}
    axios.put(`http://localhost:5000/tasks/${id}`, updateTask)
  }
  const toggleTask = await fetchTask(id, afterRetrieve)

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

const funcObject = {
  'deleteFunc': deleteTask,
    'toggleFunc': toggleReminder
}
  return (
    /*
    <Router>
    
      <ThingsContext.Provider value={{'tasks': tasks, 'deleteFunc': deleteTask, 'toggleFunc': toggleReminder}}>
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
      
      </ThingsContext.Provider>
    </Router>
    */
   
<ThingsProvider>
     <Test></Test>
   </ThingsProvider>

  );
}

export default App;
