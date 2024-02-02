'use server'

import * as z from 'zod'
import { NewPasswordSchema } from '@/schemas'
import { getPasswordResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import bcryptjs from 'bcryptjs'
import { db } from '@/lib/db'

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Missing token' }
  }
  console.log('token:', token)

  const validatedFields = NewPasswordSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }
  const { password } = validatedFields.data

  // トークンの確認
  const exisitingToken = await getPasswordResetTokenByToken(token)
  if (!exisitingToken) {
    return { error: 'Invlid token' }
  }

  // トークンが古くなっていないか確認
  const hasExpired = new Date(exisitingToken.expires) < new Date()
  if (hasExpired) {
    return { error: 'Token has expired' }
  }

  // ユーザーがきちんと存在するかの確認
  const exisitingUser = await getUserByEmail(exisitingToken.email)
  if (!exisitingUser) {
    return { error: 'Email does not exist!' }
  }

  // passwordのハッシュ化 と 更新
  const hashedPassword = await bcryptjs.hash(password, 10)
  await db.user.update({
    where: { id: exisitingUser.id },
    data: { password: hashedPassword },
  })

  // tokenの削除
  await db.passwordResetToken.delete({
    where: { id: exisitingToken.id },
  })

  return { success: 'Password updated!' }
}
