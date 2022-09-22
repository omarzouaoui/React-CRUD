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

    //loading
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
      setTimeout(()=>{
        setLoading(false)
      },3500)
    },[])
    
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
      localStorage.setItem("taskAdded",JSON.stringify([...tasks, newTask]));
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
      localStorage.setItem("taskAdded", JSON.stringify(deleteTask))
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

    //Fetching from local storage
    const getTasks=JSON.parse(localStorage.getItem("taskAdded"));
    useEffect(()=>{
      if(getTasks==null){
        setTasks([])
      }else{
        setTasks(getTasks)
      }
    },[])



    return (
      <>
        {
          loading ?
            <div className="spinnerContainer">
              <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            </div> :
            <div className="container">
              {/* App Header that has open and App Name */}
              <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
                {/* Revealing of Add Task Form */}
                {showAddTask && <AddTask onSave={addTask} />}
                {/* Task Counter */}
                <h3>Number of Tasks: {tasks.length}</h3>
                
                {/* Displaying of Tasks */}
                {
                  tasks.length > 0 ?
                    (<Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} />) :
                    ('No Task Found!')
                }
            </div>
          }
      </>
  )
  
}
export default App;