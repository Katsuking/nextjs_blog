import { UserInfo } from '@/components/user-info'
import { currentUser } from '@/lib/auth'

const ServerPage = async () => {
  const user = await currentUser()

  return (
    <div>
      <UserInfo user={user} label="Sever components" />
    </div>
  )
}

export default ServerPage
