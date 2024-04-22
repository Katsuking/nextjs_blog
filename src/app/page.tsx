import Content from '@/components/Contents/Content'

interface HomeProp {
  searchParams?: {
    query?: string
    page?: string
  }
}

export default function Home({ searchParams }: HomeProp) {
  const query = searchParams?.query || ''
  let currentPage = 1
  if (searchParams?.page != undefined)
    currentPage = parseInt(searchParams?.page)

  return (
    <main>
      <Content query={query} page={currentPage} />
      {/* <div className="py-[500px]"></div> */}
    </main>
  )
}
