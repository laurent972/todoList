'use client'
import cookie from "js-cookie"

const Header = () => {

    const removeCookie = (key) =>{
        if(window != 'undefined'){
            cookie.remove(key,{expires:1});
        }
    }

    const logout = async (e) =>{
        e.preventDefault();

          try{  
            const response = await fetch('http://localhost:5500/users/logout', {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
            });
             console.log(response);
                
            if(response.ok){
                removeCookie('jwt')
                
            }

          }catch(err){
            console.log(err);
            
          }  
      

    }


    return(
        <header>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">TodoList</a>
                </div>
                <div className="flex-none gap-2">
                    <form onSubmit={logout}>
                        <button type="submit">Logout</button> 
                    </form>
                </div>
                
            </div>
        </header>
      
    )
}

export default Header;