'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const Login = () =>{

    const router = useRouter(); 
    let [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        // Vérifier que les champs ne sont pas vides
        if (!email || !password) {
            setErrorMessage('Veuillez entrer un email et un mot de passe');
            return;
        }
    
        const loginRequest = { email, password };
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(loginRequest),
            });
    
            const data = await response.json();
    
            if (response.status !== 200) {
                setErrorMessage(data.error || 'Login échoué');
            } else {
                router.push('/tasks');
            }
        } catch (err) {
            console.log('Erreur:', err);
            setErrorMessage('Erreur de connexion');
        }
    };



    return(
        <div className="w-full md:w-[450px] bg-white p-2 md:p-8 shadow-2xl rounded-lg">
            <h1 className="mb-5 uppercase font-bold">Se connecter</h1>
              <form onSubmit={ handleLogin  }>
                <label className="input input-bordered flex items-center gap-2 mb-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input id="email" type="text" className="grow" placeholder="email" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd" />
                    </svg>
                    <input id="password" type="password" className="grow" placeholder="password" />
                </label>
                    <input type="submit" className={'bg-blue-500 hover:bg-blue-800 p-2 mt-5 rounded-lg text-white cursor-pointer'}/>
            </form>
            <div className="pt-8">
                {errorMessage.length>0 && <p className="text-rose-700">{errorMessage}</p>}
                <p className="text-md font-bold">Pas encore de compte ?</p>
                <Link href={"/register"} className="underline text-blue-500"> S&apos;enregistrer</Link>
            </div>
            
        </div>            
    )
}


export default Login;