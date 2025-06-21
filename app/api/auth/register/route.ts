import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/db/db";
import userModel from "@/models/User";

// export const POST = async(request: NextRequest){
//     try{

//     }catch(error){

//     }
// }
// we can write this type of funciton like that we write in js


// but the bellow one is documentation method

export async function POST(request: NextRequest){
    try{
        const {email, password} = await request.json();
        if(!email || !password){
            return NextResponse.json(
                {error: "Email and password are required"},
                {status: 400}
            );
        }

        // check existing user. but before that we have to know which server edje is running and we want to check inside the db

        // check for db connection
        await connectToDb();

        // user creation
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {error: "User is already registered"},
                {status: 400}
            );
        }

        const newUser = await userModel.create({email, password});

        return NextResponse.json(
                {message: "User registered successfully", user: newUser},
                {status: 200},
            );
    }catch(error){
        console.error("Registration error: ", error);
        return NextResponse.json(
                {message: "Failed to register user"},
                {status: 400},
            );
    }
}