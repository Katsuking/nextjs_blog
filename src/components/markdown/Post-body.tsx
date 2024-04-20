import markdownStyles from './markdown-style.module.css'

type Props = {
  content: string
}

export function PostBody({ content }: Props) {
  return (
    <div className="container mx-auto px-5">
      <div className="max-w-2xl mx-auto">
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  )
}
