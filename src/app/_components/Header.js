import Image from "next/image";
import Link from "next/link";


const Header = () => {
    return(
        <header>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">TodoList</a>
                </div>
                <div className="flex-none gap-2">
                    <Link href={'http://localhost:5500/users/logout'}>Logout</Link> 
                </div>
                
            </div>
        </header>
      
    )
}

export default Header;