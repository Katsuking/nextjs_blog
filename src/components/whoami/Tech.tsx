import TwoItems from '@/components/whoami/TwoItems'
import { TbBrandDocker } from 'react-icons/tb'
import { SiMysql } from 'react-icons/si'
import { SiNginx } from 'react-icons/si'

const Tech = () => {
  return (
    <div>
      <div className="block md:hidden mx-3">
        <h2 className="my-2">Things I Love</h2>
        <div className="flex flex-row justify-between mx-10">
          <div className="flex flex-col">
            <TbBrandDocker size={50} />
            <p>Docker</p>
          </div>
          <div className="flex flex-col">
            <SiMysql size={50} />
            <p>MySQL</p>
          </div>
          <div className="flex flex-col">
            <SiNginx size={50} />
            <p>Nginx</p>
          </div>
        </div>
      </div>
      <div className="hidden md:block ml-5">
        <h2 className="text-[60px]">Things I love</h2>
        <div className="grid grid-cols-3">
          <TwoItems className="m-2 justify-center">
            <TbBrandDocker size={50} className="mx-2" />
            <p className="text-[50px]">Docker</p>
          </TwoItems>
          <TwoItems className="m-2 justify-center">
            <SiMysql size={50} className="mx-2" />
            <p className="text-[50px]">MySQL</p>
          </TwoItems>
          <TwoItems className="m-2 justify-center">
            <SiNginx size={50} className="mx-2" />
            <p className="text-[50px]">Nginx</p>
          </TwoItems>
        </div>
      </div>
    </div>
  )
}

export default Tech
