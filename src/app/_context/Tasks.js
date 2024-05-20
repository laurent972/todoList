'use client'
const { createContext, useState, useContext } = require("react");

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    let [list, setList] = useState([]);

    return (
        <TasksContext.Provider value={[list, setList]}>{ children }</TasksContext.Provider>
    )
}

export const UseTasks = () =>{
    return useContext(TasksContext);
}