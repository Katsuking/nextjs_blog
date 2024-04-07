import CardItem from '@/components/Contents/Post/CardItem'
import Posts from '@/app/posts'
import Intro from '@/components/Contents/Intro/Intro'

const Content = () => {
  return (
    <div className="bg-fixed bg-center bg-cover bg-[url('/images/bg-dark-fixed.jpg')] rounded-lg">
      <div className="py-20 flex flex-col md:flex-row justify-evenly">
        <div className="mx-5">
          <Intro />
        </div>
        <div className="m-3 md:w-full">
          <h2 className="text-white font-bold">日々の学習のアウトプット</h2>
          <p className="text-white">といっても DB高くて、Prisma使えない...</p>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 justify-between my-4">
            {Posts.map((el) => (
              <CardItem
                key={el.title}
                title={el.title}
                desc={el.desc}
                content={el.content}
                imageUrl={el.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
