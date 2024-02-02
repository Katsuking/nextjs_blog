'use server'

import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verification-token'
import { db } from '@/lib/db'

export const newVerification = async (token: string) => {
  // トークンからトークンテーブルを確認
  const exisitingToken = await getVerificationTokenByToken(token)
  if (!exisitingToken) {
    return { error: 'Token does not exist!' }
  }

  // トークンの期限切れ確認
  const hasExpired = new Date(exisitingToken.expires) < new Date()
  if (hasExpired) {
    return { error: 'Token has expired' }
  }

  // きちんとemailが変わらずに存在しているか確認
  const exisitingUser = await getUserByEmail(exisitingToken.email)
  if (!exisitingUser) {
    return { error: 'User does not exist' }
  }

  // emailのverifiedに設定 + emailの更新(再設定用)
  await db.user.update({
    where: { id: exisitingUser.id },
    data: {
      emailVerified: new Date(),
      email: exisitingToken.email, // registration 時には必要ないが、メール再設定時に必要になる
    },
  })

  // verificationTokenの削除
  await db.verficationToken.delete({
    where: { id: exisitingToken.id },
  })

  return { success: 'Email verified!' }
}
