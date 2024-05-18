import { Post } from '@/types/post'
import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const postsDirectory = join(process.cwd(), '_posts')

export async function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return { ...data, slug: realSlug, content } as Post
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export async function fetchFilteredPosts(query: string) {
  const all_posts = await getAllPosts()
  const filteredPost = all_posts.filter((el) => el.content.includes(query))
  return filteredPost
}

export const generateStaticParams = async () => {
  // slugの一覧になるobjを返す
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
