'use client'

import Image from 'next/image'
import { useState } from 'react'

const AboutMe = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="mb-10">
      <div className="flex flex-row container justify-between items-start">
        <div className="flex justify-center w-full sm:w-1/2">
          <div className="rounded-lg bg-orange-300 my-5 mx-8 max-w-[600px]">
            <Image
              src={isHovered ? '/images/real_me.jpg' : '/images/whoami.jpg'}
              alt="intro-img"
              width={600}
              height={600}
              className="rounded-lg transform translate-x-4 translate-y-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
        </div>
        <div className="hidden sm:flex flex-col justify-start items-start w-1/2 mt-10 ml-10 h-full">
          <h1 className="text-[50px] font-bold">$ whoami</h1>
          <p className="flex-grow text-[14px] md:text-[20px] mx-5 my-6 h-full space-y-3">
            <span>趣味: 筋トレ, 海外旅行(円高のとき), IT技術</span>
            <br />
            <span>最近は blazingly fast! な実行速度と安全性に魅了され、</span>
            <br />
            <span>Rustを勉強中</span>
            <br />
            <span> TSは趣味と仕事の間に位置しますが</span>
            <br />
            <span>Rustは完全に趣味の世界。</span>
            <br />
          </p>
        </div>
      </div>
      <div className="sm:hidden flex flex-col mx-5 my-4">
        <h1 className="font-bold text-[20px]">$ whoami</h1>
        <p className="text-start ml-10">
          最近は、blazingly fast! <br />
          な実行速度に魅了されて、Rustを勉強中
          <br />
          rustはじっくり煮込んでいきます。
        </p>
      </div>
    </div>
  )
}

export default AboutMe
