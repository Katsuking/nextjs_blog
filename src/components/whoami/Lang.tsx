import TwoItems from '@/components/whoami/TwoItems'
import { FaRust } from 'react-icons/fa'
import { FaPython } from 'react-icons/fa'
import { BiLogoTypescript } from 'react-icons/bi'

const Lang = () => {
  return (
    <div>
      <div className="block md:hidden m-3">
        <h2 className="my-2">Languages I Love</h2>
        <div className="flex flex-row justify-between mx-10">
          <FaRust size={50} />
          <BiLogoTypescript size={50} />
          <FaPython size={50} />
        </div>
      </div>
      <div className="hidden md:block">
        <h2 className="text-[60px]">Languages I love</h2>
        <div className="grid grid-cols-3">
          <TwoItems className="m-2 justify-center">
            <FaRust size={50} className="mx-2" />
            <p className="text-[50px]">Rust</p>
          </TwoItems>
          <TwoItems className="m-2 justify-center">
            <BiLogoTypescript size={50} className="mx-2" />
            <p className="text-[50px]">TypeScript</p>
          </TwoItems>
          <TwoItems className="m-2 justify-center">
            <FaPython size={50} className="mx-2" />
            <p className="text-[50px]">Python</p>
          </TwoItems>
        </div>
      </div>
    </div>
  )
}

export default Lang