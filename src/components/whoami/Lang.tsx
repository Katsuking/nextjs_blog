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
          <div className="flex flex-col justify-center items-center">
            <FaRust size={50} />
            <span>Rust</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <BiLogoTypescript size={50} />
            <span>Typescript</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <FaPython size={50} />
            <span>Python</span>
          </div>
        </div>
      </div>
      <div className="hidden md:block ml-5">
        <h2 className="text-[60px]">Languages I love</h2>
        <div className="grid grid-cols-3">
          <TwoItems className="m-2 justify-center">
            <FaRust size={50} className="mx-2" />
            <span className="text-[50px]">Rust</span>
          </TwoItems>
          <TwoItems className="m-2 justify-center">
            <BiLogoTypescript size={50} className="mx-2" />
            <span className="text-[50px]">TypeScript</span>
          </TwoItems>
          <TwoItems className="m-2 justify-center">
            <FaPython size={50} className="mx-2" />
            <span className="text-[50px]">Python</span>
          </TwoItems>
        </div>
      </div>
    </div>
  )
}

export default Lang
