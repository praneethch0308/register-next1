
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const prisma = new PrismaClient
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret:process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn: '/signin',
        newUser:'/signup'
    },

    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "johndoe@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password){
                return null
            }

            const existingUser = await prisma.user.findUnique({
                where: {email: credentials?.email}
            })
            if(!existingUser){
                return null;
            }

            const passWordMatch = await compare(credentials.password,existingUser.password)

            if(!passWordMatch){
                return null
            }

            return {
                id: `${existingUser.id}`,
                firstName: existingUser.firstName,
                email: existingUser.email
            }
          }
        })
      ],

      callbacks:{
        async jwt({ token, user}) {
            if(user){
                return Promise.resolve({
                    ...token,
                    id: user.id,
                    email:user.email,
                    firstName: user.firstName
                });
            }
            return Promise.resolve(token);
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user:{
                    ...session.user,
                    firstName: token.firstName,
                    email: token.email
                }


            };
        }
    }
   

}