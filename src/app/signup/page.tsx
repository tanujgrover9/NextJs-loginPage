
"use client"
import './style.css'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup(){
    const router = useRouter();
    const [user, setUser]=React.useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled, setButtonDisabled]=React.useState(false)
    const [loading, setLoading]=useState(false)

    const onSignup = async ()=>{
        try {
            setLoading(true);
            const response = axios.post("/api/users/signup",user)
            console.log("signup suscessful",(await response).data)
            toast.success("Signup successful")
            router.push("/login")

            
        } catch (error:any) {
            console.log("Signup failed", error.message)
            toast.error(error.message)
            
        }finally{
            setLoading(false)
        }

    }
    useEffect(()=>{
        if(user.email.length >0 && user.password.length >0 && user.username.length >0){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }

    },[user])


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 signup-div">
            <h1>{loading ?"Processing":"SignUp"}</h1>
            <hr/>

            <label htmlFor="username">Username</label>
            <input
                type="text"
                className='username'
                id="username-1"
                name="username"
                onChange={(e)=>setUser({...user, username:e.target.value})}
                value={user.username}
                placeholder="username"
            />
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                name="email"
                className="border p-1 text-black"
                onChange={(e)=>setUser({...user, email:e.target.value})}
                value={user.email}
                placeholder="email"
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                className="border p-1 text-black"
                onChange={(e)=>setUser({...user, password:e.target.value})}
                value={user.password}
                placeholder="password"
            />
            <button className="p-4 border mt-3" onClick={onSignup}>{buttonDisabled ? "No SignUp":"SignUp"}</button>
            <Link href='/login'>Visit Login page</Link>


        </div>
    )
}
