import { cn } from '@/lib/utils'
import markdownStyles from './markdown-style.module.css'

type Props = {
  content: string
}

export function PostBody({ content }: Props) {
  return (
    <div className="container mx-auto px-3 mt-2">
      <div className="max-w-2xl mx-auto">
        <div
          className={cn('dark:bg-black', markdownStyles['markdown'])}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  )
}
