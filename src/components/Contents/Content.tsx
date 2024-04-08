import CardItem from '@/components/Contents/Post/CardItem'
import Posts from '@/app/posts'
import Intro from '@/components/Contents/Intro/Intro'

const Content = () => {
  return (
    <div className="bg-fixed bg-center bg-cover bg-[url('/images/bg-dark-fixed.jpg')] rounded-lg">
      <div className="py-20 flex flex-col md:flex-row justify-evenly">
        <div className="mx-5 mt-20 md:min-w-[250px]">
          <Intro />
        </div>
        <div className="m-3 md:w-full">
          <h2 className="text-white font-bold">日々の学習のアウトプット</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-between my-4">
            {Posts.map((el) => (
              <CardItem
                key={el.title}
                title={el.title}
                desc={el.desc}
                content={el.content}
                imageUrl={el.imageUrl}
                url={el.url}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-[40px] text-white text-end mr-5 mb-4 italic invisible md:visible">
        The &#39;earth&#39; without &#39;art&#39; is &#39;eh&#39;
      </p>
    </div>
  )
}

export default Content
