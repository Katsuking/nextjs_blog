import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

type CardItemProps = {
  title: string
  desc: string
  content: string
  imageUrl: string
  url: string
}

const CardItem = ({ title, desc, content, imageUrl, url }: CardItemProps) => {
  return (
    <div>
      <Link href={`${url}`}>
        <Card className="opacity-80 hover:opacity-100">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{desc}</CardDescription>
          </CardHeader>
          <div className="flex flex-row items-center">
            <CardContent className="flex flex-row w-full justify-between">
              <p>{content}</p>
              <Image
                src={imageUrl}
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
