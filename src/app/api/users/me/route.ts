import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";
import {connect} from '@/databaseConfig/dbconfig';

connect()

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findById({_id:userId}).
        select("-password")

        return NextResponse.json({
            message:"user Found",
            data:user
        })
        
    } catch (error:any) {
        return NextResponse.json({ error: "Something went wrong" },
         { status: 400 });

        
    }
    
}
