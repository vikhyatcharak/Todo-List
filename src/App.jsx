import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';//helps to generate unique ids
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [mounted,setMounted]=useState(false)//to prevent the second useEffect before the first loads the todos from local storage
  const[finished,setFinished]=useState(false)//for showFinished button
  
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    // console.log("Loaded todos from localStorage:", todoString)
    if(todoString){//if todoString is not Null
      let storedTodos=JSON.parse(localStorage.getItem("todos"))
      setTodos(storedTodos)
      setMounted(true)
    }
  }, [])
  useEffect(() => {
    if(mounted){
      // console.log("Saving todos to localStorage:", todos)
      localStorage.setItem("todos",JSON.stringify(todos))
    }
    
  }, [todos,mounted])
  
  

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  const handleSave = () => {

            //if an existing todo is being edited
    const editingIndex=todos.findIndex((item)=>item.isEditing)
    if(editingIndex!==-1){
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = { ...updatedTodos[editingIndex], todo, isEditing: false };
      setTodos(updatedTodos);
    }
    else{  //if a new todo is being added
      setTodos([...todos, {id: uuidv4(), todo, isCompleted: false, isEditing:false }])
    }
    setTodo("")
  }  
  const handleEdit=(id)=>{
    // console.log(id)
    const todoToEdit=todos.find((todo)=> todo.id===id)
    setTodo(todoToEdit.todo); // Set the current todo in the input field
    const todoInEdit=todos.map((item)=>(item.id===id?{...item,isEditing:true}:item))//mark the todo as editing
    setTodos(todoInEdit)
  }
  const handleDelete=(id)=>{
    const x=confirm("are you sure you want to delete this")
    if(x){
      const index=todos.findIndex((todo)=>todo.id===id)
      const updatedTodos=todos.filter((todo)=>todo.id!==id)
      setTodos(updatedTodos)
    }
  }
  const handleCheckBox=(e)=>{
    let id=e.target.name
    const index = todos.findIndex((todo) => todo.id === id)
    const newTodos=[...todos]
    newTodos[index].isCompleted=!newTodos[index].isCompleted
    setTodos(newTodos)
  }
  const toggleFinished=()=>{
    setFinished(!finished)
  }

  return (
    <>
    <div className="site ">

      <Navbar />

      <div className="p-3 bg-blue-200 m-1 lg:w-[50vw] md:w-2/3 mx-auto rounded-xl">

        <div className="desc font-extrabold text-2xl text-center">TM - Manage Your Todos</div>

        <div className="head pt-10">
          <div className="heading text-xl font-bold mb-1">Add a ToDo</div>
          <div className="input flex flex-col gap-2">
            <input onChange={handleChange} value={todo} type="text" className='saveInput rounded-lg px-4 py-1' />
            <button onClick={handleSave} disabled={todo.trim()==""} className="bg-violet-600 disabled:bg-violet-500 text-white rounded-3xl hover:bg-violet-700 py-1 w-[30vw] mx-auto">Save</button>
          </div>
          <input type="checkbox" onChange={toggleFinished} checked={finished} className="mt-3 hover:cursor-pointer" />Show Finished
        </div>

        <div className="line h-[2px] bg-slate-300"></div>
        
        <div className="body pb-10">
          <div className="title text-xl font-bold my-1">Your ToDos</div>
          <div className="todos flex flex-col gap-3">
            {todos.length==0 && <div className="m-2">No todos to display</div>}
            {todos.map(item=>{        {/*shown if show Finished checkbox true and if not true the only show which are not finished*/}
              return (finished || !item.isCompleted) && 
              <div key={item.id} className="todo flex gap-2 m-1 lg:w-1/2 md:w-2/3  justify-between">
                <div className="flex gap-2 items-between max-w-[70%] overflow-x-hidden">
                  <input type="checkbox" checked={item.isCompleted} onChange={handleCheckBox} name={item.id} className='hover:cursor-pointer'/>
                  <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full gap-1">
                  <button onClick={()=>handleEdit(item.id)} className="bg-violet-600 text-white rounded-lg hover:bg-violet-700 p-1"><FaRegEdit /></button>
                  <button onClick={()=>handleDelete(item.id)} className="bg-violet-600 text-white rounded-lg hover:bg-violet-700 p-1"><MdDeleteForever /></button>
                </div>
            </div>
            })}

          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default App
