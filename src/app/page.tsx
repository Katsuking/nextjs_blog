import Content from '@/components/Contents/Content'

interface HomeProp {
  searchParams?: { query?: string }
}

export default function Home({ searchParams }: HomeProp) {
  // console.log(searchParams)
  const query = searchParams?.query || ''
  return (
    <main>
      <Content query={query} />
      <div className="py-[1000px]"></div>
    </main>
  )
}
