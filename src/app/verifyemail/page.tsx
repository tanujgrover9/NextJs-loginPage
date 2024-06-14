"use client";

import axios from "axios";
import Link from "next/link";

import React,{useState, useEffect} from "react";



export default function VerifyEmaiPagel() {
    const [token, setToken]=useState("");
    const[verified, setVerified] = useState(false);
    const[error, setError]=useState(false);

    const verifyUserEmail = async ()=>{
        try {
            await axios.post("/api/usesr/verifyemail",{token})
            setVerified(true);
            
        } catch (error:any) {
            setError(true);
            console.log(error.response.data)
            
        }
    }
    useEffect(()=>{
        const urlToken= window.location.search.split("=")
            [1];
        setToken(urlToken || "");
        


    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
    },[token])

    return(

        <div  className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}`:"No token" }</h2>

            {verified ? (
                <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
                    <h1 className="text-5xl font-bold mb-20">Your Email is verified</h1>
                    <Link href="/login">Login</Link>

                </div>

            ):(
                <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
                    <h1 className="text-5xl font-bold mb-20">Your Email is not verified</h1>
                    <Link href="/login">Login</Link>

                </div>

            )}

        </div>


    )











}