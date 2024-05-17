import { Suspense } from "react";
import Todos from "./_components/Todos";
import Loading from "./_components/Loading";

export default function Home() {
    return (
        <Suspense fallback={<Loading/>}>
            <Todos/>
        </Suspense>
     
    )
  }