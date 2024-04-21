---
title: 'prismaの初期設定'
excerpt: 'next.js, node.js react docker mysql'
desc: 'boilderplate作るだろうからいらないか'
coverImage: '/images/man_study.jpeg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: vtakenak
  picture: '/images/man_study.jpeg'
ogImage:
  url: '/images/man_study.jpeg'
---

### prisma の初期設定

prisma のインストール

```sh
npm i -D prisma
npm i @prisma/client
```

root ディレクトリにある lib/ディレクトリに`db.ts`に書く

こう書く理由は、Next.js のホットリロードに関係して、
インスタンスを大量に作らないようにするため

```ts
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
```

prisma の初期化

```sh
npx prisma init
```

.env に記載する接続文字列

```sh
DATABASE_URL="mysql://myuser:password@localhost:3006/mydb"
```

</details>

下記のように設定して、

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  is String @id @default(cuid())
  name String
}
```

以上の設定が完了したら下記のコマンドを実行すると、
lib/db.ts で定義した db が使えるようになる

```sh
npx prisma generate
```

試しに下記のように layout.tsx とかで書いてみればきちんと補完が機能するはず

```tsx
import { db } from "@/lib/db";
const user = db.user.
```

次に DB へ schema.prisma で定義したものを反映させる

```sh
npx prisma db push
```

`http://localhost:8081/`

nextauth と prisma の連携をやってくれるパッケージのインストール

[prisma adapter のインストール](https://next-auth.js.org/v3/adapters/prisma)

```sh
npm i @next-auth/prisma-adapter@canary
```

mysql (docker compose)

prisma にクライアントで動かせる GUI があるので
phpmyadmin はなくてもいい

<details><summary>docker compose</summary>

```yaml
version: '3'

services:
  db:
    image: mysql:latest
    container_name: mydb
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_USER: myuser
      MYSQL_PASSWORD: password
      MYSQL_DATABASE: mydb
      TZ: 'Asia/Tokyo'
    ports:
      - '3006:3306'
    networks:
      - my-network
    volumes:
      - mysql-nextjs:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: phpmyadmin
    depends_on:
      - db
    environment:
      - PMA_ARBITRARY=1
      - PMA_HOST=db
      - PMA_USER=myuser
      - PMA_PASSWORD=password
    ports:
      - '8081:80'
    restart: always
    networks:
      - my-network

volumes:
  mysql-nextjs:

networks:
  my-network:
```

以上
