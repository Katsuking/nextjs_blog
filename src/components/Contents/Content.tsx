import CardItem from '@/components/Contents/Post/CardItem'
import Intro from '@/components/Contents/Intro/Intro'
import { fetchFilteredPosts, getAllPosts } from '@/lib/markdown'
import Search from '@/components/pagination/Search'
import { cn } from '@/lib/utils'
import PaginationBar from '../pagination/pagination'

interface ContentProp {
  query: string
  page: number
}

const Content = ({ query, page }: ContentProp) => {
  let posts = []
  if (query != '') {
    posts = fetchFilteredPosts(query)
  } else {
    posts = getAllPosts()
    // console.log(posts.length)
  }

  const itemsOnPage = 4 // 1ページに表示するアイテムの数
  const totalPages = Math.ceil(posts.length / itemsOnPage)
  // ここは本来fetchがやるロジックで全部取ってきて、配列を分割するなんてやらない
  // itemsOnPageの数だけ移動するスライスで代替
  const slicedPost = posts.slice((page - 1) * itemsOnPage, page * itemsOnPage)
  // console.log(slicedPost.length)

  return (
    <div className="rounded-lg">
      <div className="pt-3 pb-5 flex flex-col md:flex-row justify-evenly">
        <div className="mx-5 mt-10 md:min-w-[250px]">
          <Intro />
        </div>
        <div className="m-3 lg:m-10 md:w-full">
          <Search placeholder="search..." transparent={true} className="w-50" />
          <div className="flex flex-col">
            <h2 className="font-bold">Here comes another devlog...</h2>
            <div>
              <p>環境: ubuntu</p>
            </div>
          </div>
          <div
            className={cn(
              'items-stretch grid grid-cols-1 gap-3 justify-between my-4',
              posts.length > 1 && 'lg:grid-cols-2' // 検索結果が一つならgrid-cols-1
            )}
          >
            {posts.length < 1 && (
              <div className="py-[90px]">
                {`${query}では、コンテンツが見つかりませんでした`} <br />{' '}
                検索し直してください。
              </div>
            )}
            {slicedPost.map((el) => (
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
          <PaginationBar
            currentPage={page}
            totalPages={totalPages}
            query={query}
          />
        </div>
      </div>
      <p className="text-[40px] text-white text-end mr-5 mb-4 italic invisible md:visible">
        The &#39;earth&#39; without &#39;art&#39; is &#39;eh&#39;
      </p>
    </div>
  )
}

export default Content
