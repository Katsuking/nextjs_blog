import AboutMe from '@/components/whoami/AboutMe'
import Lang from '@/components/whoami/Lang'
import Tech from '@/components/whoami/Tech'

const WhoamiPage = () => {
  return (
    <div className="bg-fixed bg-center bg-cover bg-[url('/images/sea.jpg')] dark:bg-[url('/images/bg-dark-fixed.jpg')]">
      <div>要修正</div>
      <AboutMe />
      <Tech />
      <Lang />
    </div>
  )
}

export default WhoamiPage
