'use server'

import { getUserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/token'
import { ResetSchema } from '@/schemas'
import * as z from 'zod'

export const Reset = async (values: z.infer<typeof ResetSchema>) => {
  const validationFields = ResetSchema.safeParse(values)

  if (!validationFields.success) {
    return { error: 'Invalid email' }
  }

  // emailがDBに存在しているかの確認
  const { email } = validationFields.data
  const existingUser = await getUserByEmail(email)
  if (!existingUser) {
    return { error: 'Email not found' }
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  return { success: 'Reset email sent!' }
}
