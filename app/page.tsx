"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return <div>
    <div className="flex justify-center mt-6">
      <div className="flex justify-between">
      <div className="bg-blue-600 font-bold text-white h-10 w-24 mr-5 rounded-lg text-center p-2">
        <button onClick={()=>{
          router.push("/signup")
        }}>Register</button>
      </div>
      <div className="bg-blue-600 font-bold text-white h-10 w-24 ml-5 rounded-lg text-center p-2">
        <button onClick={()=>{
          router.push("/signin")
        }}>Sign In</button>
      </div>
      </div>
      

    </div>
  </div>
}
