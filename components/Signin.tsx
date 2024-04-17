"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import * as z from 'zod';
import {useForm, SubmitHandler, Form} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const schema = z.object({
    email: z.string().min(1,'Email is required').email('invalid email'),
    password : z.string().min(1,'Password is required').min(8)
    
})
type FormData = z.infer<typeof schema>;

export function SigninForm() {
    const { register, handleSubmit , formState:{errors, isSubmitting}} = useForm<FormData>({resolver:zodResolver(schema)});
    const router= useRouter();

    const  onSubmit = async (values:FormData) =>{
        const SignInData = await signIn('credentials',{
            email: values.email,
            password : values.password,
            redirect:false 
        })

        if(SignInData?.error){
            console.log(SignInData.error)
            return<div>Incorrect User details</div>
        } else{
            router.push('/home');
        }
    }

    return <div className="h-screen flex justify-center flex-col ">
        <div className="flex justify-center">
            <div className="bg-slate-200 px-4 pb-5 rounded-md">
            <div className="px-10">
                        <div className="text-2xl text-center font-extrabold mt-2">
                            Sign In
                        </div>

                    </div>
                <div className="pt-2 ">
                <form className=" grid col-span-1  justify-center " onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                    <label className="block mb-1 text-sm text-black border border-slate-200 text-center font-semibold pt-4">Enter Email</label>
                <input className="p-2 rounded-md" {...register("email",{
                    required:"Email is required",
                })} type="email" placeholder="abcde@gmail.com"/>
                {errors.email && <div>{errors.email.message}</div>}
                    </div>
                <div>
                <label className="block mb-2 text-sm text-black text-center font-semibold pt-4">Enter Password</label>

                <input className="border rounded-md border-slate-200 p-2"  {...register("password",{
                                required:"password is required",
                                })} type="password" placeholder="Enter password"/>
                                    {errors.password && <div>{errors.password.message}</div>}
                </div>
                

  <button disabled={isSubmitting} className="bg-blue-600 text-white hover:bg-blue-300 w-full rounded mt-3 p-2 " type="submit">{isSubmitting?"Submitting":"Submit"}</button>


                </form>

                </div>
            </div>

        </div>
    </div>
}
