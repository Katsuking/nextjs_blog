### 概要

middlewareを使って、全体をprotected routeに設定する

### node upgrade using nvm

最新版のインストール

```sh
nvm install node # "node" is an alias for the latest version
```

### nextjs install

```sh
npx create-next-app@latest my-app --typescript --tailwind --eslint
```

### tailwindcss

[tailwindcss setup](https://tailwindcss.com/docs/guides/nextjs)

[prettier](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)

### nextauth

```sh
npm install next-auth
```

### callback

```
http://localhost:3000/api/auth/callback/google
```

### shadcn

[shadcn](https://ui.shadcn.com/docs/installation/next)

![Alt text](./images/shadcn.png)

```sh
npx shadcn-ui@latest add button
```

login new-password 等の諸々に CardWrapper を使って統一する

```sh
npx shadcn-ui@latest add card
```

フォームの追加
`react-hook-form`や`zod`などを追加してくれる

```sh
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
```

dropdown-menu

```sh
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
```

```sh

```

### react-icons

Google, Githubなどのアイコンをまとめたパッケージを使う

```sh
npm i react-icons
```

### ORM

いつもどおりprismaを使います
prisma adapterもインストール

```sh
npm install @prisma/client @next-auth/prisma-adapter@canary
npm i -D prisma
```

lib/db.ts

```ts
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
```

初期化

```sh
npx prisma init
```

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

.envに記載する接続文字列

```sh
DATABASE_URL="mysql://myuser:password@localhost:3006/mydb"
```

<details>

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
lib/db.tsで定義したdbが使えるようになる

```sh
npx prisma generate
```

試しに下記のようにlayout.tsxとかで書いてみればきちんと補完が機能するはず

```tsx
import { db } from "@/lib/db";
const user = db.user.
```

次にDBへschema.prismaで定義したものを反映させる

```sh
npx prisma db push
```

### auth.config.ts

[Edge compatibility](https://authjs.dev/guides/upgrade-to-v5?authentication-method=middleware#edge-compatibility)
