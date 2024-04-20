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
