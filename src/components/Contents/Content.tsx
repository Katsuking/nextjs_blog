import CardItem from '@/components/Contents/Post/CardItem'

const Content = () => {
  return (
    <div className="m-3 md:mx-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-between">
        <CardItem
          title="title"
          desc="description"
          content="content"
          imageUrl="/images/man_study.jpeg"
        />
        <CardItem
          title="title"
          desc="description"
          content="content"
          imageUrl="/images/man_study.jpeg"
        />
        <CardItem
          title="title"
          desc="description"
          content="content"
          imageUrl="/images/man_study.jpeg"
        />
      </div>
    </div>
  )
}

export default Content
