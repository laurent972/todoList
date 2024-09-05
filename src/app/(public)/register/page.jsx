'use client'

import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';


const Register = () =>{
    const router = useRouter(); 
    let [errorMessage, setErrorMessage] = useState('');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const newUser = {
            pseudo:e.target.pseudo.value,
            email:e.target.email.value,
            password:e.target.password.value,
            verifPassword:e.target.verifPassword.value,
        }
        if(e.target.password.value.length < 6){
            setErrorMessage('Le mot de passe est obligatoire et doit compter minimum 6 caractères')
        }
        if(e.target.password.value != e.target.verifPassword.value){
            setErrorMessage('Le mot de passe ne correspond pas')
        }else if( e.target.pseudo.value.length <= 3 ){
           setErrorMessage('Le prénom est obligatoire et doit comper plus de 3 caractères')
        }else if(!emailPattern.test(e.target.email.value)){
            setErrorMessage("L'email est erroné ")
        }else{
            try{
                let response;
                response = await fetch("http://localhost:5500/users/register", {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify(newUser),
                  });
                  const data = await response.json()
                   
                  if(!response.ok){
                    setErrorMessage(data.Erreur);
                   }else if(response.ok){
                     router.push('/')
                  }

            }catch(err){
                console.log('catch:'+ err);
            }
        }
        
    }



    return (
        <div className="hero bg-base-200 min-h-screen">
             <div className="hero-content text-center flex-col">
                <div className="w-full md:w-[450px] bg-white p-2 md:p-8 shadow-2xl rounded-lg">
                    <h1 className="mb-5 uppercase font-bold">Créer un compte</h1>
                    <form onSubmit={ handleRegister }>
                    <label className="input input-bordered flex items-center gap-2 mb-5">
                            
                            <input id="pseudo" type="text" className="grow" placeholder="Prénom" />
                        </label>
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
                            <input id="password" type="password" className="grow" placeholder="password"/>
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mt-1">
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
                            <input id="verifPassword" type="password" className="grow" placeholder="password"/>
                        </label>
                            <input type="submit" className={'bg-blue-500 hover:bg-blue-800 p-2 mt-5 rounded-lg text-white cursor-pointer'}/>
                    </form>
                    <div className="pt-8">
                        {errorMessage.length>0 && <p className="text-rose-700">{errorMessage}</p>}
                        <Link href={'/'} className="underline text-blue-500"> Se connecter</Link>
                    </div>    
                </div> 
        </div>        
    </div>   

    )
}

export default Register;