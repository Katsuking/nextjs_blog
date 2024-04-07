import Image from 'next/image'

const Intro = () => {
  return (
    <div className="md:flex md:flex-col hidden">
      <div>
        <h1 className="text-[35px] text-white italic">
          I&#39;m Katsuya <br />
          <span className="pl-4">Takenaka</span>
        </h1>
      </div>
      <div>
        <Image
          src="/images/bg-dark-fixed.jpg"
          alt="intro-img"
          width={300}
          height={300}
        />
      </div>
    </div>
  )
}

export default Intro
