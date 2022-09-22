import './App.css';
//components
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

//Hooks
import{useState,useEffect} from "react";

//Packages
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';

function App() {
  // All States
    const [tasks, setTasks] = useState([]); // Task State
    const [showAddTask, setShowAddTask] = useState(false); // To reveal add task form

    // add Task
    const addTask=(task)=>{
      const id=uuidv4();
      const newTask={id,...task}
      setTasks([...tasks,newTask]);
      Swal.fire({
        icon:'success',
        title:'Yay...',
        "text":"You have successfully added a new task!"
      })
    }

    //Delete task
    const deleteTask=(id)=>{
      const deleteTask=tasks.filter((task)=>task.id !==id);
      setTasks(deleteTask);
      Swal.fire({
        icon:"success",
        title:"Oops...",
        text:"You have a successfully deleted a task!"
      })
    }

    //Update task
    const editTask=(id)=>{
      const text=prompt("Task Name");
      const day=prompt("Day and Time");
      const myData=tasks.map(x=>{
        if(x.id===id){
          return{
            ...x,
            texy:text,
            day:day,
            id:uuidv4()
          }
        }
        return x;
      })
      Swal.fire({
        icon:'success',
        title:"Yay",
        text:"You have successfully edited an existing task;"
      })
    }

    return (
        <>
          <div className="container">
            {/* App Header */}
            <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
            {/* Revealing the Add Task Form */}
            {showAddTask && <AddTask onSave={addTask} />}
            <h3>Number of Tasks:{tasks.length}</h3>
            {/* Displaying Tasks */}

            {tasks.length > 0 ?
                (<Tasks tasks={tasks} />) :
                ('No Task Found!')}
          </div>
        </>
    )
}
export default App;