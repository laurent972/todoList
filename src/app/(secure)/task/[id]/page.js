'use client'
import { UseTasks } from "@/app/_context/Tasks";
import { useParams } from "next/navigation";


const SinglePage = () =>{

    const params = useParams()

    let [toto,setToto] = UseTasks();
    console.log(params.id);
    console.log(toto);

    return(
        <>
        {toto.map((to,id) => (
            id == params.id && <h1 key={id}>{to.title}</h1>
        ))}
        </>  
    )
}

export default SinglePage;