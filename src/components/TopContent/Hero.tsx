import { Spotlight } from '@/components/ui/Spotlight'
import { TextGenerateEffect } from '../ui/Text-generate-effect'
import MagicButton from '../ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa6'

const Hero = () => {
  return (
    <div className="pb-36 pt-20">
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="white"
      />
      <div className="h-screen w-full dark:bg-grid-white/[0.03] bg-grid-black/[0.02] flex items-center justify-center absolute top-0 left-0">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="flex justify-center relative mt-20 z-20">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest text-sm text-center max-w-80">
            Next.js is fun
          </h2>
          <TextGenerateEffect
            className="text-center md:text-5xl lg:text-6xl w-full"
            words="Here comes another devlog..."
          />
          <p className="text-center mb-4 md:tracking-wider md:text-lg lg:text-2xl">
            Hi, I&apos;m Katsuya Takenaka
          </p>
          <MagicButton
            title="Check my blog"
            position="left"
            icon={<FaLocationArrow size={20} className="" />}
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
