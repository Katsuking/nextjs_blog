import { cn } from '@/lib/utils'

type toolProps = {
  children: React.ReactNode
  className: string
}

const TwoItems = ({ children, className }: toolProps) => {
  return (
    <div className={cn('flex flex-row items-center', className)}>
      {children}
    </div>
  )
}

export default TwoItems
