import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Post } from '@/types/post'
import Image from 'next/image'
import Link from 'next/link'

const CardItem = ({ title, slug, coverImage, excerpt, desc }: Post) => {
  if (typeof slug == 'undefined') return
  return (
    <div>
      <Link href={`/posts/${slug}`}>
        <Card className="opacity-80 hover:opacity-100">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{excerpt}</CardDescription>
          </CardHeader>
          <div className="flex flex-row items-center">
            <CardContent className="flex flex-row w-full justify-between">
              <p>{desc}</p>
              <Image
                src={coverImage}
                alt="man_study"
                width={100}
                height={100}
                className="object-cover rounded-lg"
              />
            </CardContent>
          </div>
          {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
        </Card>
      </Link>
    </div>
  )
}

export default CardItem
