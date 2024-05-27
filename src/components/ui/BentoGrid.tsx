'use client'

import { cn } from '@/lib/utils'
import { BackgroundGradientAnimation } from './background-gradient-animation'
import { AuroraBackground } from './aurora-background'
import { motion } from 'framer-motion'
import Lottie from 'react-lottie'
import { useState } from 'react'
import animationData from '@/data/lottieData.json'
import MagicButton from './MagicButton'
import { FaRegCopy } from 'react-icons/fa6'

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        // 'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ',
        'grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  id?: number
  img?: string
  imgClassName?: string
  titleClassName?: string
  spareImg?: string
}) => {
  const handleCopy = () => {
    // email のコピー
    navigator.clipboard.writeText('biggiesmallsnodiggity@gmail.com')
    setCopied(true)
  }

  const [copied, setCopied] = useState(false)

  return (
    <div
      className={cn(
        'row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 h-full border border-white/[0.1]',
        // 'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4',
        className
      )}
      style={{
        background: 'rgb(2,0,36)',
        backgroundColor:
          'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 32%, rgba(7,50,148,1) 92%, rgba(27,40,80,1) 100%',
      }}
    >
      <div className={`${id === 6 && 'flex justify-center'} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, 'object-cover object-center')}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && 'w-full opacity-80'
          }`}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 flex items-center justify-center text-white font-bold" />
          </BackgroundGradientAnimation>
        )}
        <div
          className={cn(
            titleClassName,
            'group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 text-white'
          )}
        >
          <div className="font-sans font-extralight text-red-50 md:text-xs lg:text-base ">
            {description}
          </div>
          <div className="font-sans font-bold text-lg lg:text-3xl max-w-96 z-10">
            {title}
          </div>
          {id === 2 && (
            <div className="max-h-[30px]">
              <AuroraBackground>
                <motion.div
                  initial={{ opacity: 0.0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                  className="relative flex flex-col gap-4 items-center justify-center px-4 h-full"
                ></motion.div>
              </AuroraBackground>
            </div>
          )}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2 mr-3">
              <div className="flex flex-col gap-3">
                {['React.js', 'Next.js', 'Node.js'].map((item) => (
                  <span
                    key={item}
                    className="py-1 px-3 text-xs lg:text-base opacity-50 lg:opacity-100  rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="py-4 px-3 rounded-lg text-center bg-gray-800"></span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="py-4 px-3 rounded-lg text-center bg-gray-800"></span>
                {['Python', 'TS/JS', 'Rust'].map((item) => (
                  <span
                    key={item}
                    className="py-1 px-3 text-xs lg:text-base opacity-50 lg:opacity-100  rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative ">
              <div className={`absolute -bottom-5 right-0`}>
                <Lottie
                  options={{
                    loop: copied,
                    autoplay: copied,
                    animationData: animationData,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidyMid slice',
                    },
                  }}
                />
              </div>

              <MagicButton
                title={copied ? `Email copied` : `Copy my email`}
                icon={<FaRegCopy />}
                position="left"
                handleClick={handleCopy}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
