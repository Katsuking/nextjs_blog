import { PostBody } from '@/components/markdown/Post-body'
import { getAllPosts, getPostBySlug } from '@/lib/markdown'
import markdownToHtml from '@/lib/markdownToHtml'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

type MarkdownPostPageProps = {
  params: {
    slug: string
  }
}

const MarkdownPostPage = async ({ params }: MarkdownPostPageProps) => {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  const content = await markdownToHtml(post.content || '')

  return (
    <div>
      <PostBody content={content} />
    </div>
  )
}

export const generateMetaData = ({
  params,
}: MarkdownPostPageProps): Metadata => {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  const title = `${post.title} Next.js`

  return {
    title,
  }
}

export const generateStaticParams = async () => {
  // slugの一覧になるobjを返す
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default MarkdownPostPage
