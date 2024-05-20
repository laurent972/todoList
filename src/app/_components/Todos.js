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

   const handlePush =() =>{
        console.log('toto');
        setTodos(
            [...todos,{ title: 'Acheter du saucison', Description: ' ',date: '12/02/2023'}]
           
        )
        /*todos.push(
            { 
                title: 'Acheter du saucison',
                Description: ' ',
                date: '12/02/2023'
            }
        )*/
       
    }
    
    console.log(todos);

    return(

        <>
            <input type="text" id="name" name="name" className={"border"} />
            <button onClick={()=> handlePush()}>
                Ajouter
            </button>
           
            <ul>
                {todos?.map((todo,id) =>(
                    <li key={id}>
                        {todo.title}
                    </li>
                ))}
            </ul>
        
        </>
    
    )
}

export default Todos;