import { ModeToggle } from '@/components/Header/darkTheme'
import { FaReact } from 'react-icons/fa6'
import NavItems from './NavItems'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#020817]">
      <nav className="flex justify-between items-center mx-2 py-4">
        <Link href="/">
          <div className="flex flex-row space-x-2">
            <div className="sm:ml-20 items-stretch">
              <FaReact size={50} />
            </div>
            <div className="flex flex-col">
              <h1>my playground</h1>
              <p className="md:pl-9">using Next.js</p>
            </div>
          </div>
        </Link>
        <div className="flex flex-row items-center sm:mr-20 space-x-3">
          <NavItems />
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Header
