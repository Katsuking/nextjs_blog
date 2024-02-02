// middlewareはedgeで動作するので、auth.config.tsを使う必要がある

import authConfig from '@/auth.config'
import NextAuth from 'next-auth'
import {
  DEFAULT_LOGIN_REDIRECT,
  PublicRoutes,
  authRoutes,
  apiAuthPrefix,
} from './routes'

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = PublicRoutes.includes(nextUrl.pathname) // array内にあれば、Public route
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // ログインユーザーは、register/ login/のページには行かせない
  // 逆にログインしていないユーザーは /settingsには行かせない

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // nextUrlをparamに渡せば絶対パスになる
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null // defaultではすべてのユーザーがアクセスできる
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  return null
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
