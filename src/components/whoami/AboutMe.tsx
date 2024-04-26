import Image from 'next/image'

const AboutMe = () => {
  return (
    <div className="relative">
      <Image
        src="/images/whoami.jpg"
        alt="intro-img"
        width={300}
        height={300}
        className="absolute"
      />
    </div>
  )
}

export default AboutMe
