import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import bcrypt from 'bcryptjs'
import { error } from "console";

export async function POST(request: NextRequest) {
    
    const body = await request.json();

    const {name, email, password}:{ name: string; email: string, password: string } = body;

    console.log(name,email,password);

    if(name == "Mitko Kazakov"){
        return new NextResponse("Forbidden name", {status: 400});
    }

    // if(name == "Mitko Kazakov"){
    //     throw new Error("Forbidden name");
    // }

    return NextResponse.json({name: name, email: email, password: password})
    
}