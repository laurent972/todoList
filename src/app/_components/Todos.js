'use client'

import { Suspense } from "react";

const { default: listesTodos } = require("../api/load.todos")


const Todos = async () =>{

    let todos = await listesTodos();
    console.log(todos);

    const handlePush =() =>{
        console.log('toto');
        todos.push(
            { 
                title: 'Acheter du saucison',
                Description: ' ',
                date: '12/02/2023'
            }
        )
        console.log(todos);
    }
    


    return(

        <>
            <input type="text" id="name" name="name" className={"border"} />
            <button onClick={handlePush}>
                Ajouter
            </button>
            <Suspense fallback={'tododos'}>
            <ul>
                {todos.map((todo,id) =>(
                    <li key={id}>
                        {todo.title}
                    </li>
                ))}
                
            </ul>
            </Suspense>
        
        </>
    
    )
}

export default Todos;