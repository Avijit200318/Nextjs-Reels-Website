import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./db";
import userModel from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {label: "Email", type: "text"},
            password: {label: "Password", type: "password"}
        },
        async authorize(credentials){
            if(!credentials?.email || !credentials?.password){
                throw new Error("Misssing email or password");
            }

            try{
                await connectToDb();
                const user = await userModel.findOne({email: credentials.email});

                if(!user){
                    throw new Error("No user found with this email");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if(!isValid){
                    throw new Error("Invalid Password");
                }

                // the return data that we send on the basis of that the session is created.
                return {
                    id: user._id.toString(),
                    email: user.email
                }
            }catch(error){
                console.error("Auth error", error);
                throw error;
            }
        }
    })        
  ],
//   implementing callbacks
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({session, user, token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60 //1 days max age,
    },
    secret: process.env.NEXTAUTH_SECRET,
};
