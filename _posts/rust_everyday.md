---
title: '毎日rust'
excerpt: 'rust'
desc: '毎日rustでなんか作ります。Day1 からだんだん難易度上げていきたい。けど、疲れてどうしようもないときは復習回'
coverImage: '/images/man_study.jpeg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: vtakenak
  picture: '/images/man_study.jpeg'
ogImage:
  url: '/images/man_study.jpeg'
---

### 毎日 rust

freecodecamp とかに Next.js や python 周りみたいに親切な動画があるわけではないので、
メインのプロジェクトを頑張りつつ、エクササイズとしてこれをやっていきます。
とりあえず何か作るっていうことを毎日続けてみる。

縛り: 毎日次の日のお題は設定してから寝ること。

### Day1: CLI の一歩目

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

### Day2: BufReader / BufWriter で処理を早くする

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

### Day 3: テスト

下記の設定を Cargo.toml に追加

```toml
[dev-dependencies]
assert_cmd = "2.0.14"
predicates = "3.1.0"
```

テストしやすいように一行一行出力する処理を関数に切り取ります

```rust
// さまざまな種類の出力先を受け取ること
fn find_matches<W: Write>(
    lines: Lines<BufReader<File>>,
    pattern: &str,
    handle: &mut W,
) -> Result<(), Box<dyn Error>> {
    for line in lines {
        if let Ok(line) = line {
            if line.contains(pattern) {
                writeln!(handle, "{}", line)?;
            }
        }
    }
    Ok(())
}
```

main の中もスッキリ

```rust
find_matches(lines, &args.pattern, &mut handle)?;
//     for line in lines {
//     if let Ok(line) = line {
//         if line.contains(&args.pattern) {
//             writeln!(handle, "{}", line)?;
//         }
//     }
// }
Ok(())
```

準備が整ったので、実際にテストコードを書いていきます。

```rust

#[test]
fn find_a_match() {
    let file = File::open("./README.md").unwrap(); // README.mdをテストに読み取る
    let lines = BufReader::new(file).lines();
    let mut result = Vec::new(); // Write には、空のVector を渡す
    find_matches(lines, "build", &mut result).unwrap();
    //  b prefix makes this a byte string literal so its type is going to be &[u8]
    assert_eq!(result, b"cargo build\n"); // stdout expects bytes (not strings)
}

#[test]
fn file_not_found() -> Result<(), Box<dyn Error>> {
    let mut cmd = Command::cargo_bin("day1")?;
    // 存在しないファイルのパスを渡す
    cmd.arg("everyone").arg("/file/does/not/exists");
    cmd.assert()
        .failure()
        .stderr(predicate::str::contains("File not found")); // 期待されるエラーの中身確認
    Ok(())
}
```

以上
