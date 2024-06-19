'use client'
import { useContext, useEffect, useState } from "react";
import { UseTasks } from "../_context/Tasks";
import Link from "next/link";
import { FaRegCircle } from "react-icons/fa"
import { FaRegCheckCircle } from "react-icons/fa";





const Todos = () =>{

    let [tasks,setTasks,updateTask] = UseTasks();
   
    const handleClick = (index,todo) => {
        console.log(todo);
        const updatedTask = { ...tasks[index], todo: !todo };
        updateTask(index, updatedTask);
    };
  
   const handlePush = async (e) =>{
        e.preventDefault()
      
        let theDate = new Date();

        const task = { 
            title: e.target.task.value, 
            description: e.target.desc.value,
            createDate: (theDate.getDate())+"/" +(theDate.getMonth())  +"/" +(theDate.getFullYear()),
            todo: true 
        }
    
        setTasks(
          [...tasks, { title: e.target.task.value, description: e.target.desc.value, createDate: (theDate.getDate())+"/" +(theDate.getMonth())  +"/" +(theDate.getFullYear()), todo: true }]
        )

        try{
            let response;
            response = await fetch("http://localhost:5500/tasks/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
              });
        } catch(err){
            console.log(err);
        }finally{
         e.target.task.value = ""
        }
    }

    const handleStatus = async (e, todoId, contextId, todo) => {
        e.preventDefault();
                 
        handleClick(contextId, todo);

        console.log(tasks);

        if(todo){
            try{
                let response;
                response = await fetch(`http://localhost:5500/tasks/task-done/${todoId}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                   },
                body: JSON.stringify({todo: !todo}),
                });
            }catch(err){
                console.log(err);
             }finally{
    
             }
        }
        try{
            let response;
            response = await fetch(`http://localhost:5500/tasks/task-undone/${todoId}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
               },
                body: JSON.stringify({todo: !todo}),
            });
        }catch(err){
            console.log(err);
         }finally{

         }

    }



    return(
        <>
            <form onSubmit={handlePush}>
            <input type="text" id="task" name="task" className={"border"}/><br></br>
            <input type="text" id="desc" name="desc" className={"border"} placeholder='Description' />
            <input type="submit" className={'bg-blue-500 p-2 mt-5'}/>
            </form>

            <ul>
                {tasks?.map((todo,id) =>(
                    <li key={id}>
                        <button onClick={(e) => handleStatus(e, todo._id, id, todo.todo )}>
                            {todo.todo ? <FaRegCircle /> : <FaRegCheckCircle />}
                        </button>
                       <Link href={`/task/${id}`}>{todo.title}</Link> 
                       <br/>
                        {todo.Description}
                        <span className="italic text-xs	">{todo.createDate}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Todos;