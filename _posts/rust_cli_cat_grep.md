---
title: 'CLI の一歩目'
excerpt: 'rust'
desc: '毎日rust 超かんたんなCLIを作ってみます'
coverImage: '/images/man_study.jpeg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: vtakenak
  picture: '/images/man_study.jpeg'
ogImage:
  url: '/images/man_study.jpeg'
---

### CLI の一歩目

今日は簡単な CLI を作成する

テキストは[Wizard of Oz](https://www.gutenberg.org/ebooks/55)を使います。

plain text ダウンロードしても、web 版開いて丸コピでもいい

[ripgrep](https://github.com/BurntSushi/ripgrep)の 1 万分の 1 のレベル感でいきます。
よく使われる[clap tutorial](https://docs.rs/clap/latest/clap/_derive/_tutorial/chapter_0/index.html)を使って作成するので、
下記を実行

```sh
cargo add clap --features derive
cargo build
```

まずは clap の derive feature を使った一番シンプルな例

```rust
use std::path::PathBuf;
use clap::Parser;

// clap crateを使って、コマンドライン引数に型をつける
#[derive(Parser)]
struct Cli {
    pattern: String,
    path: PathBuf,
}

fn main() {
    let args = Cli::parse();
    println!("pattern: {:?}, path: {:?}", args.pattern, args.path);
}
```

下記で実行してみる

```sh
cargo run a b
cargo run # 引数を与えないパターンも
```

bash でいうところの

```sh
cat <ファイルパス> | grep <pattern>
```

になるように変更する

```rust
use clap::Parser;
use std::path::PathBuf;

// clap crateを使って、コマンドライン引数に型をつける
#[derive(Parser)]
struct Cli {
    pattern: String,
    path: PathBuf,
}

fn main() {
    let args = Cli::parse();
    // ファイルの中身を読んでみる (一気にメモリに投げ込むので最適解ではない)
    let content = std::fs::read_to_string(&args.path).expect("Could not read file");

    // 読み取ったテキストの一行一行で第一引数のpatternを含む行を出力する
    for line in content.lines() {
        if line.contains(&args.pattern) {
            println!("{}", line)
        }
    }
}
```

下記の出力内容は同じ

```sh
cat ~/Downloads/wizard_of_oz.txt | grep everyone
cargo run everyone ~/Downloads/wizard_of_oz.txt
```
