'use client'

import { UserRole } from '.prisma/client'
import { useCurrentRole } from '@/hooks/use-current-role'
import { FormError } from '../form-error'

interface RoleGateProps {
  children: React.ReactNode
  allowRole: UserRole
}

export const RoleGate = ({ children, allowRole }: RoleGateProps) => {
  const role = useCurrentRole()

  if (role !== allowRole) {
    return (
      <FormError message="You do not have a permission to view this content" />
    )
  }

  return <>{children}</>
}
