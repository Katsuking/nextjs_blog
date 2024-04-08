import { TiThMenu } from 'react-icons/ti'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { FaGithub } from 'react-icons/fa'
import { FaLinux } from 'react-icons/fa'
import Link from 'next/link'

const HamberguerMenu = () => {
  return (
    <div className="sm:hidden">
      <DropdownMenu>
        {' '}
        {/* {isOpen ? <TiThMenu size={30} /> : <TiThMenu size={30} />} */}
        <DropdownMenuTrigger asChild>
          <TiThMenu size={30} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-30">
          <DropdownMenuLabel>Explorer</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="https://github.com/Katsuking">
                <div className="flex flex-row items-center">
                  <FaGithub size={20} />
                  <p className="pt-1">Github</p>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/whoami">
                <div className="flex flex-row items-center">
                  <FaLinux size={20} />
                  <p className="pt-1">$whoami</p>
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default HamberguerMenu
