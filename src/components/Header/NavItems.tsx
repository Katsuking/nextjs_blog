import { FaGithub } from 'react-icons/fa'
import { FaLinux } from 'react-icons/fa'

const NavItems = () => {
  return (
    <div className="flex flex-col md:flex-row md:space-x-5">
      <div className="flex flex-row items-center">
        <FaGithub size={20} />
        <p className="pt-1">Github</p>
      </div>
      <div className="flex flex-row items-center">
        <FaLinux size={20} />
        <p className="pt-1">$whoami</p>
      </div>
    </div>
  )
}

export default NavItems
