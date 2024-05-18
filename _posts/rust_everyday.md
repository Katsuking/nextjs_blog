---
title: '毎日rust'
excerpt: 'rust'
desc: 'rustはお金のためではなくて、computingの深淵を覗くための趣味の世界です。毎日rustでなんか作るか、概念を学んでいきます。ゆっくり時間をかけて育てていきます。'
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

### Day 4: CSV 読み込み

必要なクレートを用意

```sh
cargo add serde_derive serde
```

csv の中身をみてみると、
ヘッダーで city だけが小文字で始まってたり、
NULL のものがあったりする。

```csv
city,State,Population,Latitude,Longitude
Davidsons Landing,AK,,65.2419444,-165.2716667
Kenai,AK,7610,60.5544444,-151.2583333
Oakman,AL,,33.7133333,-87.3886111
Richards Crossroads,AL,,31.7369444,-85.2644444
Sandfort,AL,,32.3380556,-85.2233333
Selma,AL,18980,32.4072222,-87.0211111
Shadow Oaks Addition,AR,,34.9555556,-91.9475000
Summerville,AR,,33.5202778,-92.3555556
El Mirage,AZ,32308,33.6130556,-112.3238889
Willow Springs,AZ,,36.1894444,-111.3930556
Colton,CA,52335,34.0738889,-117.3127778
Fontana,CA,169160,34.0922222,-117.4341667
Fountain Valley,CA,56133,33.7091667,-117.9527778
Kings Beach,CA,,39.2377778,-120.0255556
Milpitas,CA,62636,37.4283333,-121.9055556
Mokelumne City,CA,,38.2530556,-121.4380556
Mount Eden,CA,,37.6361111,-122.0988889
San Clemente,CA,62272,33.4269444,-117.6111111
Seal Beach,CA,24404,33.7413889,-118.1038889
West Hollywood,CA,37031,34.0900000,-118.3608333
Bridgeport,CT,139090,41.1669444,-73.2052778
Orange,CT,13860,41.2783333,-73.0261111
Azalea Park,FL,12347,28.5408333,-81.3008333
Bratt,FL,,30.9655556,-87.4275000
Cutler Ridge,FL,26831,25.5802778,-80.3469444
Dunn Creek,FL,,30.4861111,-81.5908333
South Daytona,FL,14451,29.1655556,-81.0047222
Brickhouse,GA,,33.7750000,-82.8108333
Lakeview Heights,GA,,33.6188889,-84.4505556
Perry,GA,11234,32.4580556,-83.7316667
Roswell,GA,77218,34.0230556,-84.3616667
Warfield,GA,,33.2994444,-83.3838889
Kirkman,IA,,41.7286111,-95.2650000
Travers,ID,,42.6091667,-113.7361111
Calhoun,IL,,38.6502778,-88.0436111
Cleone,IL,,39.4230556,-87.9075000
Deerfield,IL,19618,42.1711111,-87.8444444
Highbank Town,IN,,38.5144444,-87.1502778
Indianapolis,IN,773283,39.7683333,-86.1580556
Leona,KS,,39.7872222,-95.3213889
New Salem,KS,,37.3105556,-96.8950000
Flint Springs,KY,NULL,37.3433333,-86.7136111
Harvey,LA,22383,29.9033333,-90.0772222
```

では、csv を読み込んで出力します。
コメントで書いているように deserialize する際にエラーがでたら
必ず None にするように`#[serde(deserialize_with = "csv::invalid_option")]`を使います。

```rust
use serde_derive::Deserialize;
use std::io;

// csvとは順不同
#[derive(Debug, Deserialize)]
// #[serde(rename_all = "PascalCase")] // すべて大文字ならこれでいい
struct Record {
    #[serde(rename = "Latitude")]
    latitude: f64,
    #[serde(rename = "Longitude")]
    longitude: f64,
    #[serde(rename = "Population")]
    #[serde(deserialize_with = "csv::invalid_option")]
    // どんなdeserialize error もNone valueに置き換える
    population: Option<u64>,
    city: String, // cityだけ小文字のケース
    #[serde(rename = "State")]
    state: String,
}

fn main() {
    if let Err(err) = run() {
        println!("{}", err);
    }
}

fn run() -> Result<(), Box<dyn std::error::Error>> {
    let mut rdr = csv::Reader::from_reader(io::stdin());
    // deseriazlie で iteratorを作成
    for result in rdr.deserialize() {
        let record: Record = result?;
        println!("{:?}", record)
    }
    Ok(())
}
```

### Day 5: なぜマクロが必要なのか?

単純にコードの簡素化

C#がソースジェネレーターをもつ理由と同じで、単純に開発者が怠惰だからっていこともいえる?
例えば下記のような例 attribute を付与してあげれば
{:?}を使ってインスタンスの内容をデバッグ出力としてフォーマットできます。

```rust
#[derive(Debug)]
struct Person {
    name: String,
    age: u32,
}
```

これで出力するときにいちいち trait を実装する手間が省けるわけです。

動的配列を実装するためのデータ構造である`vector`を使う例です。
マクロがいかに便利なものかわかります。

```rust
let mut numbers = vec![1, 2, 3, 4, 5];
```

python でリストを作成するのと同じように簡単に作成できます。
もしマクロがなかったら

```rust
let mut numbers: Vec<i32> = Vec::new();
numbers.push(1);
numbers.push(2);
numbers.push(3);
numbers.push(4);
numbers.push(5);
```

このように一つ一つ追加して行く必要がある

### Day 6: Rust における async tokio

```toml
[dependencies]
tokio = { version = "1", features = ["full"] }
anyhow = "1"
```

```rust
#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;
    Ok(())
}
```
