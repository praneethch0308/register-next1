"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const router= useRouter();

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Register
                        </div>
                    </div>
                    <div className="pt-2">
                        <LabelledInput onChange={(e) => {
                            setFirstname(e.target.value);
                        }} label="Firstname" placeholder="John" />

                        <LabelledInput onChange={(e) => {
                            setLastname(e.target.value);
                        }} label="LastName" placeholder="Doe" />

                        <LabelledInput onChange={(e) => {
                            setUsername(e.target.value);
                        }} label="Username" placeholder="abcde@gmail.com" />

                        <LabelledInput onChange={(e) => {
                            setPassword(e.target.value)
                        }} label="Password" type={"password"} placeholder="123456" />
                        <button onClick={async ()=>{
                            await axios.post("http://localhost:3000/api/user",{
                                firstname,
                                lastname,
                                username,
                                password
                            });
                            router.push("/")
                        }} type="button" className="mt-8 w-full text-white bg-blue-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Register</button>
                        <div className="mt-2 text-sm text-black font-semibold">
                                <p>Already have an Account?</p>
                                <button onClick={()=>{
                                    router.push("/signin")
                                }}><p className="text-blue-500">Login here</p></button>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>

}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: ChangeEventHandler<HTMLInputElement>
}
