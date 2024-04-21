---
title: 'markdownのコードにsyntax highlightをつける'
excerpt: 'next.js react'
desc: 'react-markdown, react-syntax-highlighterとは別の方法で実装します。'
coverImage: '/images/man_study.jpeg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: vtakenak
  picture: '/images/man_study.jpeg'
ogImage:
  url: '/images/man_study.jpeg'
---

![guy studin all day](/images/man_study.jpeg)

## Syntax Highlight

react 周りだと、react-markdown, react-syntax-highlighter がかなり検索で引っかかります。

今回は別の方法で実現します。

使うパッケージは下記の通り、

```sh
npm i gray-matter remark remark-rehype rehype-stringify
npm i rehype-pretty-code shiki
```

大前提として、[Next.js blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)
を参考に作成しているので、構造は違えどやっていることはほとんど同じです。

```sh
project_root
├── README.md
├── _posts <- ここに.mdファイルを投げ入れていく
│   └── hello_world.md
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── node_modules/
├── package-lock.json
├── package.json
├── postcss.config.js
├── prettier.config.js
├── public/
├── src
│   ├── app
│   ├── components
│   ├── lib <- markdown周りの関数はここに書く
│   └── types
├── tailwind.config.ts
└── tsconfig.json
```

相違点は markdownToHtml.ts 下記の部分

このファイルは名前の通り markdown を html に変換しています。

- [blog-starter markdownToHtml.ts](https://github.com/vercel/next.js/blob/canary/examples/blog-starter/src/lib/markdownToHtml.ts)

```ts
import { remark } from 'remark'
import html from 'remark-html' // <- ちなみにsyntax highlightをつけるのにこれはいらない

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}
```

- 修正箇所

Syntax highlight をつけるためには、下記のように変更します。

```ts
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkRehype)
    .use(rehypePrettyCode)
    .use(rehypeStringify)
    .process(markdown)
  return result.toString()
}
```

ルートディレクトリにある/\_posts 以下の markdown ファイルを
読みに行ってくれている処理まとめ

```tsx
import { Post } from '@/types/post'
import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return { ...data, slug: realSlug, content } as Post
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export const generateStaticParams = async () => {
  // slugの一覧になるobjを返す
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

正直、Github や技術系のブログがたくさんある昨今、
わざわざ自前でマークダウンに Syntax Highlight をつけるのための実装なんているかと思っています。

ですが、エンジニアがブログを書くならコードがちょこっとかけるくらいにはしとこうくらいで書いてます。
