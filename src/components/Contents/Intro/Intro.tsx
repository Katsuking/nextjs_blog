import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowDroprightCircle } from 'react-icons/io'

const Intro = () => {
  return (
    <div className="md:flex md:flex-col hidden">
      <div className="ml-10">
        <h1 className="text-[25px] text-white italic">
          I&#39;m Katsuya <br />
          <span className="pl-8">Takenaka</span>
        </h1>
      </div>
      <div className="relative">
        <Image
          src="/images/whoami.jpg"
          alt="intro-img"
          width={300}
          height={300}
          className="absolute"
        />
        <Link href="/whoami">
          <div className="flex flex-row items-center absolute top-[170px] left-[20px] bg-[#060e1f] rounded-lg p-2">
            <IoIosArrowDroprightCircle />
            <span>MORE ABOUT ME</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Intro
