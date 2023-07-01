---
title: "git pushの自動化"
subtitle: "cron に git push をやってもらう"
date: "2023-06-24"
---

### 環境 + requirements

- Ubuntu (Linux)
- Github アカウント

windowsなら[WSL](https://learn.microsoft.com/ja-jp/windows/wsl/install)でできるかな?

### ディレクトリ構造

```
.
├── git_cron.log
├── git_root_path.sh
└── push.sh
```


### 環境変数の用意

gitのrootディレクトリをまとめる

👇 git_root_path.sh

```sh
#!/bin/bash
USER_EMAIL="<メールアドレス>"
USER_NAME="<Githubアカウント名>"
SSD_DEV="/media/external1/developement" # 開発しているディレクトリ

declare -a git_root=(
    "${SSD_DEV}/generalJob"
    "${SSD_DEV}/docker-compose"
)

```

自分は外付けSSD内の一つのディレクトリにまとめて開発しているので、`SSD_DEV`にまとめてます。

### 実行ファイル作成

👇 push.sh

```sh
#!/bin/bash

# このスクリプトがあるディレクトリの絶対パス
ENV="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

env_file="${ENV}/.envrc"

if [ -e $env_file ]; then
    source "${env_file}"
    echo "${env_file}"
fi

# 上のスクリプトで作成した環境変数を読み込む
source "${ENV}"/git_root_path.sh

echo "The root directories are: ${git_root[@]}"

for root_dir in "${git_root[@]}"
do
    if [ -d "$root_dir/.git" ]; then # 指定したディレクトリに.gitがあれば,push
        echo "Git repository exists in $root_dir"
        echo "pushを行います。"
        cd "${root_dir}"

        BRANCH=$(git symbolic-ref --short HEAD)
        echo $BRANCH
        git pull
        git config --global user.email "${USER_EMAIL}"
        git config --global user.name "${USER_NAME}"
        git add -A
        git commit -m "daily update!"
        git push origin ${BRANCH}:${BRANCH}
    else
        echo "Git repository does not exist in $root_dir"
        continue
    fi
done
```

### cronを仕込む

`crontab -e`で編集

```crontab
0 0 * * * /media/external1/developement/generalJob/git_cron/push.sh > /media/external1/developement/generalJob/git_cron/git_cron.log 2>&1
```

以上!!
たったこれだけ!!

