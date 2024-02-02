'use server'

import { UserRole } from '.prisma/client'
import { currentRole } from '@/lib/auth'

/**
 * 現在のユーザーが管理者かどうかをチェックし、結果を返します。
 *
 * @returns {Promise<{ success: string } | { error: string }>}
 *   - 成功した場合: `{ success: 'Allowed!' }`
 *   - 失敗した場合: `{ error: 'Forbidden' }`
 */

export const admin = async () => {
  const role = await currentRole()

  if (role !== UserRole.ADMIN) {
    return { error: 'Forbidden' }
  }

  return { success: 'Admin-only server action success!' }
}
