
"use client"
import './style.css'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage(){
    const router = useRouter();
    const [user, setUser]=React.useState({
        email:"",
        password:"",
        // username:""
    })
    const [buttonDisabled, setButtonDisabled]=React.useState(false)
    const [loading, setLoading]=useState(false)

    const onLogin = async ()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user)
            console.log("login suscessful", response.data)
            toast.success("Login successful")
            router.push("/profile")

            
        } catch (error:any) {
            console.log("Login failed", error.message)
            toast.error(error.message)
            
        }finally{
            setLoading(false)
        }


    }
    useEffect(()=>{
        if(user.email.length >0 && user.password.length >0 ){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }

    },[user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 login-div">
            <h1>{loading ?"Processing":"Login"}</h1>
            <hr/>

          
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                name="email"
            
                onChange={(e)=>setUser({...user, email:e.target.value})}
                value={user.email}
                placeholder="email"
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                onChange={(e)=>setUser({...user, password:e.target.value})}
                value={user.password}
                placeholder="password"
            />
            <button className="p-4 border mt-3" onClick={onLogin}>Login</button>
            <Link href='/signup'>Visit SignUp page</Link>


        </div>
    )
}
