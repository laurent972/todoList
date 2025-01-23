'use client'
import cookie from "js-cookie"
import { useRouter } from 'next/navigation';

const Header = () => {
  
    return(
        <header>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">TodoList</a>
                </div>
                <div className="flex-none gap-2">
                 
                </div>
                
            </div>
        </header>
      
    )
}

export default Header;