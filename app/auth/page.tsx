"use client";

import Input from "@/components/input";
import { useCallback, useState } from "react";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === "login" ? "register" : "login")
  }, []);

  const register = useCallback(async() => {
    try{
      const response = await axios.post('/api/register', {
            email,
            name,
            password
        });
      console.log(response.data);

    } catch(error){
      console.log(error);
    }
  }, [email, name, password]);




    return (
      <>
        <div className="relative h-screen h-full w-full bg-[url('/images/background.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black bg-opacity-70 lg:opacity-70 w-full h-full w-full">
                <nav className="absolute px-12 py-5 z-2">
                    <img src="/images/netflix_logo.svg" alt="Logo" className="h-12"/>
                </nav>
            
            <div className="flex justify-center items-center">
                <div className="bg-black bg-opacity-90 px-16 py-16 self-center mt-40 lg:w-2/5 rounded-md w-full">
                    
                    <h2 className="text-white text-4xl mb-8 font-semibold">
                      {variant === "login" ? "Sign in" : "Register"}
                    </h2>

                    <div className="flex flex-col gap-4">
                      {variant === "register" && (
                        <Input
                          label="Username"
                          onChange={(ev: any) => {setEmail(ev.target.value)}}
                          id="name"
                          type="text"
                          value={email}
                        />
                        )}
                      <Input
                        label="Email"
                        onChange={(ev: any) => {setName(ev.target.value)}}
                        id="email"
                        type="email"
                        value={name}/>
                      <Input
                        label="Password"
                        onChange={(ev: any) => {setPassword(ev.target.value)}}
                        id="password"
                        type="password"
                        value={password}/>
                      </div>

                  <button onClick={register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                    {variant === "login" ? "Login" : "Sign up"}
                  </button>

                  <p className="text-neutral-500 mt-10">
                    {variant === "login" ? 'First time using Netflix?' : "Already have an account?"}
                    <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                      {variant === "login" ? "Create an account" : "Sign in"}
                    </span>
                  </p>

                </div>
            </div>
        </div>

      </div>
      </>
    );
  }
  
export default Auth;
