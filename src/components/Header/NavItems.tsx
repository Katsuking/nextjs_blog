import { FaGithub } from 'react-icons/fa'
import { FaLinux } from 'react-icons/fa'
import Link from 'next/link'

const NavItems = () => {
  return (
    <div className="hidden sm:block">
      <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-5 items-center">
        <Link href="https://github.com/Katsuking">
          <div className="flex flex-row items-center">
            <FaGithub size={20} className="mx-1" />
            <p className="pt-1">Github</p>
          </div>
        </Link>
        <Link href="/whoami">
          <div className="flex flex-row items-center">
            <FaLinux size={20} className="mx-1" />
            <p className="pt-1">$whoami</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default NavItems
