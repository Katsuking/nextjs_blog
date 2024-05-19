import React from 'react'

export type ContentProp = {
  query: string
  page: number
}

export type HomeProp = {
  searchParams?: {
    query?: string
    page?: string
  }
}

export type MagicButtonProp = {
  title: string
  icon: React.ReactNode
  position: string
  handleClick?: () => void
  otherClasses?: string
}
