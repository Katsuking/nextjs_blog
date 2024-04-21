import CardItem from '@/components/Contents/Post/CardItem'
import Intro from '@/components/Contents/Intro/Intro'
import { fetchFilteredPosts, getAllPosts } from '@/lib/markdown'
import Search from '@/components/pagination/Search'
import { cn } from '@/lib/utils'

interface ContentProp {
  query: string
}

const Content = ({ query }: ContentProp) => {
  let posts = []
  if (query != '') {
    posts = fetchFilteredPosts(query)
  } else {
    posts = getAllPosts()
    // console.log(posts.length)
  }

  return (
    <div className="bg-fixed bg-center bg-cover bg-[url('/images/bg-dark-fixed.jpg')] rounded-lg">
      <div className="pt-3 pb-5 flex flex-col md:flex-row justify-evenly">
        <div className="mx-5 mt-10 md:min-w-[250px]">
          <Intro />
        </div>
        <div className="m-3 lg:m-10 md:w-full">
          <Search placeholder="search..." transparent={true} className="w-50" />
          <h2 className="text-white font-bold">Here comes another devlog...</h2>
          <div
            className={cn(
              'items-stretch grid grid-cols-1 md:grid-cols-1 gap-3 justify-between my-4',
              posts.length > 1 && 'lg:grid-cols-2' // 検索結果が一つならgrid-cols-1
            )}
          >
            {posts.length < 1 && (
              <div className="py-[90px]">
                {`${query}では、コンテンツが見つかりませんでした`} <br />{' '}
                検索し直してください。
              </div>
            )}
            {posts.map((el) => (
              <CardItem
                desc={el.desc}
                slug={el.slug}
                key={el.title}
                title={el.title}
                excerpt={el.excerpt}
                coverImage={el.coverImage}
                author={el.author}
                content={el.content}
                ogImage={el.ogImage}
                date={el.date}
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
