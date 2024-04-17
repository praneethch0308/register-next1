"use client"
import axios from "axios";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { resolve } from "path";
import { LegacyRef, useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import { PrismaClient } from "@prisma/client";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Link from "next/link";

const schema = z.object({
    firstName : z.string().min(1,'firstName is required').max(50),
    lastName : z.string().min(1,'lasstName is required').max(50),
    email: z.string().min(1,'Email is required').email('invalid email'),
    password : z.string().min(1,'Password is required').min(8)
    
})

type FormData = z.infer<typeof schema>;

const prisma = new PrismaClient();

export default function SignupForm() {
  const { register, handleSubmit , formState:{errors, isSubmitting}} = useForm<FormData>({resolver:zodResolver(schema)});
  const router = useRouter();
  const [error, setError] = useState("");
  

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    try {
      const response = await axios.post("http://localhost:3000/api/user", data);
      if (response.status === 201) {
        router.push('/signin');
      } else {
        setError("Unable to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Unable to create user. Please try again later.");
    }

  };

    return <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="px-4 pb-5 rounded-md bg-slate-200">
          <div className="px-10">
          <div className="text-2xl text-center font-extrabold mt-2">
                            Sign Up
                        </div>
              

          </div>
          <div className="pt-2">     
            <form className=" grid col-span-1  justify-center " onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-1 text-sm text-black border border-slate-200 text-center font-semibold pt-4">Enter FirstName</label>
                <input className="p-2 rounded" {...register("firstName",{
                    required:"firstName is required",
                })} type="text" placeholder="firstName"/>
                {errors.firstName && <div>{errors.firstName.message}</div>}
                <label className="block mb-1 text-sm text-black border border-slate-200 text-center font-semibold pt-4">Enter LastName</label>
                <input className="p-2 rounded" {...register("lastName",{
                    required:"lastName is required"
                })} type="text" placeholder="lastName"/>
                {errors.lastName && <div>{errors.lastName.message}</div>}
                <label className="block mb-1 text-sm text-black border border-slate-200 text-center font-semibold pt-4">Enter Email</label>
                <input className="p-2 rounded" {...register("email",{
                    required:"Email is required",
                })} type="email" placeholder="email"/>
                {errors.email && <div>{errors.email.message}</div>}
                <label className="block mb-1 text-sm text-black border border-slate-200 text-center font-semibold pt-4">Enter Password</label>
                <input className="p-2 rounded" {...register("password",{
                    required:"password is required",
                })} type="password" placeholder="password"/>
                {errors.password && <div>{errors.password.message}</div>}
                <button  className="bg-blue-600 mt-2 p-1 rounded text-white" disabled={isSubmitting} type="submit">{isSubmitting?"Submitting":"Submit"}</button>
                <div className="mt-1 grid">
                  <p className="text-sm text-center">Already  Have an Account?</p>
                  <Link className="text-blue-800 text-center underline" href='/signin'>signin</Link>
                </div>
                

            </form>

          </div>

        </div>
     

      </div>

        </div>
    
}

