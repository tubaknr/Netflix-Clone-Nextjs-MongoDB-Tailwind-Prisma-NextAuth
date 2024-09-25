"use client";

import Input from "@/components/input";
import { useCallback, useState } from "react";
import axios from "axios";
import {signIn} from "next-auth/react";
// import {useRouter} from "next/navigation";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";



const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  
  // const router = useRouter();

  const [variant, setVariant] = useState("login");
  
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === "login" ? "register" : "login")
  }, []);



  const login = useCallback(async() => {
    try{
      const resp = await signIn('credentials', {
        email,
        password,
        // redirect: false,
        callbackUrl: '/profiles'
      });

      // router.push('/');
      console.log(resp.data);


    }catch(error){
      console.log(error);
      console.log("Error login:", error.response?.data || error.message);

    }


  }, 
  [email, password]);




  const register = useCallback(async() => {
    try{
      const response = await axios.post('/api/register', {
            email,
            name,
            password
        });
      login();
      console.log(response.data);
      
    } catch(error){
      console.log(error);
    }
  }, [email, name, password, login]);


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
                          onChange={(ev: any) => {setName(ev.target.value)}}
                          id="name"
                          type="text"
                          value={name}
                        />
                        )}
                      <Input
                        label="Email"
                        onChange={(ev: any) => {setEmail(ev.target.value)}}
                        id="email"
                        type="email"
                        value={email}/>
                      <Input
                        label="Password"
                        onChange={(ev: any) => {setPassword(ev.target.value)}}
                        id="password"
                        type="password"
                        value={password}/>
                      </div>

                  <button onClick={variant === "login" ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                    {variant === "login" ? "Login" : "Sign up"}
                  </button>
                  <div className="flex flex-row items-center gap-4 mt-8 justify-center ">
                      <div  onClick={() => {try{
                                              const respGoogle = signIn('google', {
                                                                  callbackUrl: '/profiles'});

                                              console.log(respGoogle);
                                            }
                                            catch(error){
                                              console.log("google error:", error || error.response?.data || error.message);
                                            }} }
                            
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                        <FcGoogle size={30}/>
                      </div>

                      <div onClick={() => signIn('github', { callbackUrl: '/profiles' })} 
                                              
                           className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                        <FaGithub size={30}/>
                      </div>


                  </div>

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
