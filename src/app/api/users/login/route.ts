import { connect } from "@/databaseConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 400 });
        }
        console.log("user exists");

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ error: "invalid credentials" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            // secure: true, // Enable this in production
            sameSite: 'lax',
        });

        return response;
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
