import { PostBody } from '@/components/markdown/Post-body'
import { getAllPosts, getPostBySlug } from '@/lib/markdown'
import markdownToHtml from '@/lib/markdownToHtml'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

type Params = {
  params: {
    slug: string
  }
}

export default async function MdPage({ params }: Params) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  const content = await markdownToHtml(post.content || '')

  return (
    <div>
      <PostBody content={content} />
    </div>
  )
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  const title = `${post.title} Next.js`

  return {
    title,
  }
}
