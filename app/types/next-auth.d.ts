import NextAuth from "next-auth"

declare module "next-auth" {

    interface User{
        firstName: string,
        email: string
    }

  interface Session {
    user: User & {
        firstName: string,
        email:string
    },
    token:{
        firstName :string,
        email:string
    }
  }
}