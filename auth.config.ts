// this file triggers middleware

import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from './data/user'
import github from 'next-auth/providers/github'
import google from 'next-auth/providers/google'

export default {
  providers: [
    github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          // !user.password はOAuthを使うケース
          if (!user || !user.password) return null

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          )

          if (isPasswordMatched) return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
