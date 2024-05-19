import Link from 'next/link'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationBarProps {
  currentPage: number // to show a current page and make it unclickable.
  totalPages: number
  query: string
}

export default function PaginationBar({
  currentPage,
  totalPages,
  query,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 8))
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9))

  const numberedPageItems: JSX.Element[] = []

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <PaginationLink
        href={`?query=${query}&page=` + page}
        key={page}
        className={`join-item btn ${
          currentPage === page ? 'btn-active pointer-events-none' : ''
        }`}
      >
        {page}
      </PaginationLink>
    )
  }

  return (
    <>
      {/* 大画面のとき */}
      <PaginationItem className="join hidden sm:block">
        {numberedPageItems}
      </PaginationItem>
      {/* 以下は画面が小さい時 */}
      <Pagination className="join flex sm:hidden">
        <PaginationContent>
          {/* １のときはprevious は表示させない */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`?query=${query}&page=` + (currentPage - 1)}
              />
            </PaginationItem>
          )}
          <PaginationItem className="join-item btn pointer-events-none">
            <PaginationLink href="">{currentPage}</PaginationLink>
          </PaginationItem>
          {/* 次のページがないときは表示させない */}
          {currentPage < totalPages && (
            <PaginationItem className="join-item btn">
              <PaginationNext
                href={`?query=${query}&page=` + (currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  )
}
