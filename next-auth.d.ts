import NextAuth, {DefaultSession} from "next-auth"
// next auth has default session

declare module "next-auth" {

  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"] 
    // this line means the inside the session we have a object name user.
  }
}