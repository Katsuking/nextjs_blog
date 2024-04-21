---
title: 'よく使う zod と shadcn Formの使い方'
excerpt: 'zod ts'
desc: 'validationのときはだいたいこう使うよねってのまとめ'
coverImage: '/images/man_study.jpeg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: vtakenak
  picture: '/images/man_study.jpeg'
ogImage:
  url: '/images/man_study.jpeg'
---

### zod x Form

#### about

- zod (schemas)
- form/input
- shadcn

Next.js のリクエスト検証おいて超定番な zod

root ディレクトリに schemas/ディレクトリを作成。
ここに検証する値や制限、エラーメッセージなどをまとめる。

```ts
import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }), // z.string().min(6),
})
```

個人的にこれをよく使う場面は、[shadcn](https://ui.shadcn.com/docs/components/accordion)

```sh
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
```

上記のコマンドでフォームのコンポーネント等を追加すると
`react-hook-form`や`zod`などを追加してくれる

```tsx
//sfc
'use client'

import * as z from 'zod' // お決まり
import { LoginSchema } from '@/schemas' // 上記で作成したschemaをimport

import { useForm } from 'react-hook-form' // こいつもimport
import { CardWrapper } from './card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod' // こいつもimport
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from '@/components/ui/form' // こいつらもimport
import { Input } from '@/components/ui/input' // こいつらもimport
import { Button } from '@/components/ui/button' // 別途これもいるはず shadcn入れているならnativeで書かないはず
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { login } from '@/actions/login'

const LoginForm = () => {
  // 下のForm内でformで展開して使う
  // この書き方を抑えておく 改行しない方がきれい
  const form = useForm <z.infer <typeof LoginSchema >>
      {
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email: '',
          password: '',
        },
      }

  // ボタンが押されたときの処理
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // console.log(values);
    login(values) // 別で定義しているserver actionsに投げる
  }

  return (
    <CardWrapper
      headerLabel="welcome back"
      backButtonLabel="Don't have a account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="only.one.way.up@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="********" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message="" />
          <FormSuccess message="" />
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
```
