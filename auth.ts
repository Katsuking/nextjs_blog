import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from '@/lib/db'
import { getUserById } from '@/data/user'
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation'
import { getAccountByUserId } from './data/account'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    // when something goes wrong, out of boxで使えるページを使わないようにする
    signIn: '/auth/login',
    error: '/auth/error',
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' }, // edgeでは、dbを使ったsessionができないので
  ...authConfig,
  // sessionにもっと情報を含ませる
  events: {
    async linkAccount({ user }) {
      // GithubやGoogleでsign inする場合は、emailVertifiedカラムを埋める
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log('account:', { account })

      // allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      // prevent sign in verification email verification
      const existingUser = await getUserById(user.id)
      if (!existingUser?.emailVerified) return false

      // 2段階認証を有効にしている場合は、2段階認証
      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        )
        console.log({ twoFactorConfirmation }) // null であれば、ログインさせてはいけない。
        if (!twoFactorConfirmation) return false

        // Delete two factor confirmation for next sign in.
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        })
      }

      return true
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      // next-auth.d.ts
      // session.user.customField = "anything you want here"

      if (token.role && session.user) {
        session.user.role = token.role
      }

      // settings での更新に必要
      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email
        session.user.isOAuth = token.isOAuth as boolean
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      return session
    },
    async jwt({ token }) {
      // console.log({ token }) // token.subはId
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)
      token.isOAuth = !!existingAccount // to update settings
      token.name = existingUser.name // to update settings
      token.email = existingUser.email // to update settings
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },
  },
})
