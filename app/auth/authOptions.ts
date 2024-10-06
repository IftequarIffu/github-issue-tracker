import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/client"
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    // session: {
    //   strategy: 'jwt'
    // },
    callbacks: {
      async jwt({token, account}) {
        if (account) {
          token.id = account.providerAccountId
          token.accessToken = account.access_token
        }
        return token
      },
      async redirect({url, baseUrl}) {
        // console.log('url', url);
        // console.log('baseUrl', baseUrl);
        
        return url.startsWith(baseUrl) ? url : baseUrl + '/';
      }
    }
  }