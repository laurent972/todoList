import Header from "./_components/Header";
import Login from "./_components/Login";
import Todos from "./_components/Todos";


export default function Home() {

   const logged = false;

    return (  
         <>
            
            <div className="hero bg-base-200 min-h-screen">
             <div className="hero-content text-center flex-col">
                 {logged ?  <Todos/> : <Login />}
               </div>
            </div>
         </>
   

    )
  }