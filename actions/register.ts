'use server'

import { RegisterSchema } from '@/schemas'
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/token'
import { sendVerificationEmail } from '@/lib/mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // console.log(values)

  // client側のvalidationは簡単にbypassできてしまうので,server側でもしっかりvalidationはいる
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10) // パスワードのハッシュ化

  // emailの重複がないか確認
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword, // 絶対にpasswordを保存しないこと
    },
  })

  const verficationToken = await generateVerificationToken(email)
  // resend を使って認証用のメールを送る場合
  await sendVerificationEmail(verficationToken.email, verficationToken.token)

  return { success: 'Confirmation email sent' }
}
