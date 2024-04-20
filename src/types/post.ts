import { type Author } from './author'

export type Post = {
  slug: string
  desc: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  preview?: boolean
}

// export type PostCard = {
//   slug: string
//   title: string
//   coverImage: string
//   excerpt: string
//   preview?: boolean
// }
