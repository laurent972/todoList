'use client'
import { useContext, useEffect, useState } from "react";
import { UseTasks } from "../_context/Tasks";
import Link from "next/link";
import { FaRegCircle } from "react-icons/fa"
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FcOk } from "react-icons/fc";







const Todos = () =>{

    let [tasks,setTasks,updateTask, deleteTask] = UseTasks();
   
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

        console.log(todo);

        if(todo){
            try{
                let response;
                response = await fetch(`http://localhost:5500/tasks/task-done/${todoId}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                   },
                body: JSON.stringify({todo: false}),
                
            });
            }catch(err){
                console.log(err);
             }finally{
               
             }
        }else if(!todo){
            try{
                let response;
                response = await fetch(`http://localhost:5500/tasks/task-undone/${todoId}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                   },
                body: JSON.stringify({todo: true}),
            });
            }catch(err){
                console.log(err);
             }finally{
    
             }
        }
    }

    const handleDelete = async (todoId) =>{
        //console.log(todoId);
        deleteTask(todoId)
        try{
            let response;
            response = await fetch(`http://localhost:5500/tasks/${todoId}`,{
            method: 'DELETE',
             headers: {
               "Content-Type": "application/json",
            }
         })
         }catch(err){
           console.log(err);
        }
    }


    return(    
    <>
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                
                <div className="max-w-md bg-white p-8 shadow-2xl rounded-lg">
                    <h1 className="mb-5 uppercase font-bold">Ajouter une tâche</h1>
                    <form onSubmit={handlePush}>
                        <input type="text" id="task" name="task" className={"border input input-bordered w-full max-w-xs mb-6"} placeholder='Titre'/>
                        <input type="text" id="desc" name="desc" className={"border input input-bordered w-full max-w-xs"} placeholder='Description' />
                        <input type="submit" className={'bg-blue-500 hover:bg-blue-800 p-2 mt-5 rounded-lg text-white cursor-pointer'}/>
                    </form>

                    <ul className="space-y-4 text-left text-gray-700 dark:text-gray-400 mt-6">
                        {tasks?.map((todo, id) =>(
                            <li key={todo._id} className="border-b border-b-gray-300 py-3">
                                <div className="flex items-center">
                                    <button className='text-xl' onClick={(e) => handleStatus(e, todo._id, id, todo.todo )}>
                                        {todo.todo ? <FaRegCircle /> : <p className="checked"><FcOk /></p>}
                                    </button>
                                    <Link href={`/task/${id}`} 
                                    className={ `${ todo.todo ? '' : "line-through text-slate-400" } 
                                        hover:text-blue-500 
                                         ml-5 
                                         text-xl 
                                         font-bold 
                                         w-full
                                          block 
                                          underline
                                           decoration-1`}>
                                        {todo.title}
                                    </Link> 
                                    <button className="btn  btn-xs btn-error text-white" onClick={(e) => handleDelete(todo._id)}>
                                        <FaRegTrashCan /> 
                                    </button>
                                </div>
                               
                                <div className="flex items-center justify-between">
                                    <div className="w-60 block text-gray-500">
                                        {todo.description}
                                    </div>
                                    <div className="w-40 block">
                                        <span className="italic text-xs	">{todo.createDate.toLocaleString('fr-FR')}</span>
                                    </div>  
                                </div>
                            </li>
                            ))}
                    </ul>
                </div>
            </div>
          </div>
    </>
    )
}

export default Todos;