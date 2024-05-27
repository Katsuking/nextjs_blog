---
title: 'BufReader BufWriter'
excerpt: 'rust'
desc: '毎日rust 高速な読み書き'
coverImage: '/images/man_study.jpeg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: vtakenak
  picture: '/images/man_study.jpeg'
ogImage:
  url: '/images/man_study.jpeg'
---

### BufReader / BufWriter で処理を早くする

io では、BufReader / BufWriter を使うべき

全体的にはこんな感じ

```rust
use clap::Parser;
use std::error::Error;
use std::io::Write;
use std::path::Path;
use std::{
    fs::File,
    io::{self, BufRead, BufReader},
    path::PathBuf,
};

// clap crateを使って、コマンドライン引数に型をつける
#[derive(Parser)]
struct Cli {
    pattern: String,
    path: PathBuf,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Cli::parse();

    // 書き込みも効率化させる
    let stdout = io::stdout();
    // let mut handle = stdout.lock(); // これでもシステムが毎回stdoutをlockしたり、unlockしたりが防げる
    let mut handle = io::BufWriter::new(stdout);

    let lines = read_lines(&args.path);
    let lines = match lines {
        Ok(lines) => lines,
        Err(e) => return Err(e.into()),
    };

    for line in lines {
        if let Ok(line) = line {
            if line.contains(&args.pattern) {
                writeln!(handle, "{}", line)?;
            }
        }
    }
    Ok(())
}

fn read_lines<P: AsRef<Path>>(filepath: P) -> Result<io::Lines<BufReader<File>>, Box<dyn Error>> {
    // ファイルの中身を読んでみる
    let f = File::open(filepath).expect("File not found");
    let f = BufReader::new(f).lines();
    Ok(f)
}
```

書き込みを効率的に行う

```rust
use std::io::Write;
let stdout = io::stdout(); // get the global stdout entity
let mut handle = io::BufWriter::new(stdout);

（略）

for line in lines {
    if let Ok(line) = line {
        if line.contains(&args.pattern) {
            writeln!(handle, "{}", line)?; // ここで出力
            // println!("{}", line)?; // これじゃ遅い...
        }
    }
}
```

なぜ`println!`ではダメなのか?
`println!`は毎回 terminal の更新(flush)を行っているため、
`BufWriter`の`stdout` handle で wrap してやることが望ましい。
(by default buffers up to 8 kB)

read_lines 関数について

```rust
fn read_lines<P: AsRef<Path>>(filepath: P) -> Result<io::Lines<BufReader<File>>, Box<dyn Error>> {
    // ファイルの中身を読んでみる
    let f = File::open(filepath).expect("File not found");
    let f = BufReader::new(f).lines();
    Ok(f)
}
```

`File::open` はジェネリックな `AsRef<Path>`を引数にとるので、
同じジェネリックな制約を持たせる。
これで引数`filepath`に`&args.path`を渡すことができる。

あとは、例外処理を入れつつ出力する

```rust
    let lines = read_lines(&args.path);
    let lines = match lines {
        Ok(lines) => lines,
        Err(e) => return Err(e.into()),
    };

    for line in lines {
        if let Ok(line) = line {
            if line.contains(&args.pattern) {
                writeln!(handle, "{}", line)?;
            }
        }
    }
```
