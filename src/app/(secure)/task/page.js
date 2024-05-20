'use client'
import { UseTasks } from "@/app/_context/Tasks";

const singlePage = () =>{

    let [toto,setToto] = UseTasks();
    console.log(toto);

    return(
        <h1>TOTO</h1>
    )
}

export default singlePage;