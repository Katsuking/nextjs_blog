import { HomeProp } from '@/types/types'
import Content from '@/components/Contents/Content'

const page = ({ searchParams }: HomeProp) => {
  const query = searchParams?.query || ''
  let currentPage = 1
  if (searchParams?.page != undefined)
    currentPage = parseInt(searchParams?.page)

  return (
    <div>
      <Content query={query} page={currentPage} />
    </div>
  )
}

export default page
