'use client'
import { useContext, useEffect, useState } from "react";
import { UseTasks } from "../_context/Tasks";
import Link from "next/link";

const { default: listesTodos } = require("../api/load.todos")


const Todos = () =>{

    let [todos,setTodos] = UseTasks();
    
    useEffect(()=>{
        const fetchData= async () =>{
            const result = await listesTodos();
            setTodos(result)
        };
        fetchData()
    },[])

   const handlePush =(e) =>{
        e.preventDefault()
      
        let theDate = new Date();
    
        setTodos(
          [...todos, { title: e.target.task.value, Description: ' ', date: (theDate.getDate())+"/" +(theDate.getMonth())  +"/" +(theDate.getFullYear()) }]
        )
        e.target.task.value = ""
    }
    
    console.log(todos);

    return(

        <>
            <form onSubmit={handlePush}>
            <input type="text" id="task" name="task" className={"border"}/>
            <input type="submit" />
            </form>

            <ul>
                {todos?.map((todo,id) =>(
                    <li key={id}>
                        {todo.title}
                        {todo.Description}
                        {todo.date}
                    </li>
                ))}
            </ul>
                
            <Link className={'bg-blue-500 p-2 mt-5'} href={'/task'}>a task</Link>
        </>
     
       
    
    )
}

export default Todos;