import TwoItems from '@/components/whoami/TwoItems'
import { TbBrandDocker } from 'react-icons/tb'
import { SiNginx } from 'react-icons/si'
import { SiAppwrite } from 'react-icons/si'

const Tech = () => {
  return (
    <div>
      <div className="block md:hidden mx-3">
        <h2 className="my-2">Things I Love</h2>
        <div className="flex flex-row justify-between mx-10">
          <div className="flex flex-col">
            <TbBrandDocker size={50} />
            <span>Docker</span>
          </div>
          <div className="flex flex-col">
            <SiAppwrite size={50} />
            <span>Appwrite</span>
          </div>
          <div className="flex flex-col">
            <SiNginx size={50} />
            <span>Nginx</span>
          </div>
        </div>
      </div>
      <div className="hidden md:block ml-5">
        <h2 className="text-[60px]">Things I love</h2>
        <div className="grid grid-cols-3">
          <TwoItems className="m-2 justify-center">
            <TbBrandDocker size={50} className="mx-2" />
            <span className="text-[50px]">Docker</span>
          </TwoItems>
          <TwoItems className="m-2 justify-center">
            <SiAppwrite size={50} className="mx-2" />
            <span className="text-[50px]">Appwrite</span>
          </TwoItems>
          <TwoItems className="m-2 justify-center">
            <SiNginx size={50} className="mx-2" />
            <span className="text-[50px]">Nginx</span>
          </TwoItems>
        </div>
      </div>
    </div>
  )
}

export default Tech
