'use client'
const { createContext, useState, useContext } = require("react");
import { useEffect, useLayoutEffect } from "react";

const TasksContext = createContext();
const { default: listesTodos } = require("../api/load.todos")

export const TasksProvider = ({ children }) => {
    let [list, setList] = useState([]);

    const updateTask = (index, updatedTask) => {
        const updatedList = [...list];
        updatedList[index] = updatedTask;
        setList(updatedList);
      };

    const deleteTask = (index) => {
        setList(list.filter(task=>task._id !== index))
    }  

   /* useEffect(()=>{
        const fetchData = async () =>{
            const result = await listesTodos();
            setList(result)
        };
        fetchData()
    },[])*/

    useLayoutEffect(()=>{
        const fetchData = async () =>{
            const result = await listesTodos();
            setList(result)
        };
        fetchData()
    },[])

    return (
        <TasksContext.Provider value={[list, setList, updateTask, deleteTask]}>{ children }</TasksContext.Provider>
    )
}

export const UseTasks = () =>{
    return useContext(TasksContext);
}