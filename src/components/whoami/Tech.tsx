import TwoItems from '@/components/whoami/TwoItems'
import { TbBrandDocker } from 'react-icons/tb'
import { SiMysql } from 'react-icons/si'
import { DiNginx } from 'react-icons/di'

const Tech = () => {
  return (
    <div>
      <div className="block md:hidden mx-3">
        <h2 className="my-2">Tech I Love</h2>
        <div className="flex flex-row justify-between mx-10">
          <TbBrandDocker size={50} />
          <SiMysql size={50} />
          <DiNginx size={50} />
        </div>
      </div>
      <div className="hidden md:block">
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
            <DiNginx size={50} className="mx-2" />
            <p className="text-[50px]">Nginx</p>
          </TwoItems>
        </div>
      </div>
    </div>
  )
}

export default Tech
