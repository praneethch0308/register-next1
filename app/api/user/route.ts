import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import {z} from "zod"
import {hash} from "bcrypt"


const prisma = new PrismaClient();

const Userschema = z.object({
  firstName : z.string().min(1,'firstName is required').max(50),
  lastName : z.string().min(1,'lasstName is required').max(50),
  email: z.string().min(1,'Email is required').email('invalid email'),
  password : z.string().min(1,'Password is required').min(8)
  
})
export async function POST(req:Request) {

  try{

    const body = await req.json();
    const {firstName, lastName, email, password}= Userschema.parse(body);

    const existingEmail = await prisma.user.findUnique({
      where: {email:email}
    });
    if(existingEmail){
      return NextResponse.json({user:null,message:"User with this email already exists"},
        {status:409})
    }

    const hashedPassword = await hash(password,10)
    const newUser = await prisma.user.create({
      data:{
        firstName,
        lastName,
        email,
        password: hashedPassword
      }
    }) 

    return NextResponse.json({user:newUser, message:"User created successfully"},{status:201});
  } catch(error){

    return NextResponse.json({message:"Error while creating user account"},{status:500});

  }
  
}