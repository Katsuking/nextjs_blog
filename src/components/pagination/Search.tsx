'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce' // 入力した一文字ごとに処理が走らないようにする

type SearchProps = {
  placeholder: string
  className?: string
  transparent?: boolean
}

const Search = ({ placeholder, className, transparent }: SearchProps) => {
  // 入力に応じて、urlを更新するために下記の３つを使う
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    const lowerCaseTerm = term.toLowerCase()
    if (lowerCaseTerm) {
      params.set('query', lowerCaseTerm)
      params.delete('page') // 新規検索なので、ページ遷移を防ぐ
      replace(`${pathname}?${params.toString()}`) // 実際にURL更新する
    } else {
      params.delete('query', lowerCaseTerm)
      replace(`${pathname}`)
    }
  }, 300)

  return (
    <div className="flex justify-end mb-3">
      <Input
        className={cn(
          'bg-gray-200 text-black',
          transparent && 'opacity-80',
          className
        )}
        placeholder={placeholder}
        name="search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()} // the input field is in sync with the URL
      ></Input>
    </div>
  )
}

export default Search
