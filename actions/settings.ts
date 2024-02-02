'use server'

import { getUserByEmail, getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/token'
import { SettingSchema } from '@/schemas'
import * as z from 'zod'
import bcrypt from 'bcryptjs'

export const settings = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser()
  if (!user) {
    return { error: 'Unauthorized!' }
  }

  // ユーザーがDBにもあることを確認
  const dbUser = await getUserById(user.id)
  if (!dbUser) {
    return { error: 'Unauthorized' }
  }

  // OAuthの場合は、編集できないようにする
  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
  }

  // メールの変更
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)
    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' }
    }

    const verificationToken = await generateVerificationToken(values.email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: 'verification email sent!!' }
  }

  // passwordの変更
  if (values.password && values.newPassword && dbUser.password) {
    // hased passwordの比較
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password)
    if (!passwordMatch) {
      return { error: 'Incorrect Password' }
    }
    const hashedPassword = await bcrypt.hash(values.password, 10)
    values.password = hashedPassword
    values.newPassword = undefined // dbには存在しないので
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values, // 単純にすべてのvalueを渡す
    },
  })

  return { success: 'Updated!!' }
}
