import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '@/lib/mongodb'
import { signOut } from 'next-auth/react'



// export const authOption = NextAuth({
export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_FRONT_ID,
      clientSecret: process.env.GOOGLE_FRONT_SECRET
    }),

  ],
  adapter: MongoDBAdapter(clientPromise),
}

const handler = NextAuth(authOptions)

// export {authOption as GET, authOption as POST}
export {handler as GET, handler as POST}
// export default handle


