'use client'
import { useEffect, useState } from "react";

const { default: listesTodos } = require("../api/load.todos")


const Todos = () =>{

    let [todos,setTodos] = useState();
    
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
                [...todos, { title: e.target.name.value, Description: ' ', date: (theDate.getDate())+"/" +(theDate.getMonth())  +"/" +(theDate.getFullYear()) }]
            )
        
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
        
        </>
    
    )
}

export default Todos;