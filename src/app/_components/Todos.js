'use client'
import { useContext, useEffect, useState } from "react";
import { UseTasks } from "../_context/Tasks";
import Link from "next/link";
import { FaRegCircle } from "react-icons/fa"
import { FaRegCheckCircle } from "react-icons/fa";


const { default: listesTodos } = require("../api/load.todos")


const Todos = () =>{

    let [todos,setTodos] = UseTasks();
    
    useEffect(()=>{
        const fetchData = async () =>{
            const result = await listesTodos();
            setTodos(result)
        };
        fetchData()
    },[])

   const handlePush =(e) =>{
        e.preventDefault()
      
        let theDate = new Date();
    
        setTodos(
          [...todos, { title: e.target.task.value, description: e.target.desc.value, date: (theDate.getDate())+"/" +(theDate.getMonth())  +"/" +(theDate.getFullYear()), todo: true }]
        )
        e.target.task.value = ""
    }

    const handleStatus = (id) =>{
        console.log(id);
    }
    
    console.log(todos);

    return(
        <>
            <form onSubmit={handlePush}>
            <input type="text" id="task" name="task" className={"border"}/><br></br>
            <input type="text" id="desc" name="desc" className={"border"} placeholder='Description' />
            <input type="submit" className={'bg-blue-500 p-2 mt-5'}/>
            </form>

            <ul>
                {todos?.map((todo,id) =>(
                    <li key={id}>
                        <button onClick={() => handleStatus(id)}>
                            {todo.todo ? <FaRegCircle /> : <FaRegCheckCircle />}
                        </button>
                       <Link href={`/task/${id}`}>{todo.title}</Link> 
                       <br/>
                        {todo.Description}
                        <span className="italic text-xs	">{todo.date}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Todos;