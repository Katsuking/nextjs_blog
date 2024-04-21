---
title: 'neovim の初期設定'
excerpt: 'neovim node'
desc: 'neovim を使うために、init.luaや最新版node.jsをnvmを使ってインストールするまでの流れ'
coverImage: '/images/man_study.jpeg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: vtakenak
  picture: '/images/man_study.jpeg'
ogImage:
  url: '/images/man_study.jpeg'
---

### はじめに

[公式 neovim](https://neovim.io/)

もうほぼ思想みたいなもんですが、個人的に VScode で作業をする言語と neovim を使う言語で別れています。
vscode:
js 等の web 系
remote development でサーバーのファイルをいじるとき
neovim:
Compiled 言語
shell

neovim は、なんといっても検索やキーバインドが便利で作業自体は圧倒的に短縮できると思います。

# NEOVIM

[ubuntu にインストール](https://github.com/neovim/neovim/wiki/Installing-Neovim#linux)

👇~/.bashrc

```sh
alias nv='${ssd}/appimage/nvim.appimage'
```

neovim のバージョンチェック

```sh
nvim --version
```

必要なパッケージをインストールしていきます。

```sh
sudo apt update -y && sudo apt upgrade -y
[[ -z $(which curl) ]] && sudo apt install curl -y
[[ -z $(which git) ]] && sudo apt install git -y
[[ -z $(which fdfind) ]] && sudo apt install fd-find -y && ln -s $(which fdfind) ~/.local/bin/fd
[[ -z $(which rg) ]] && sudo apt install ripgrep -y
```

一応

```sh
pip3 install pynvim
```

## node.js のインストール

node.js version: `node --version`

windows だと普通にダウンロードして、インストールで大丈夫。
ubuntu の場合は、`sudo apt install nodejs' だと、バージョンが古い。
なので、インストール後に'nvm'を使って、アップグレードする

👇.bashrc に追加

[nvm](https://github.com/nvm-sh/nvm)にしたがって、設定

```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

では、nvm をインストールします。

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
nvm install node
```

### おまけ

fzf(fuzzy finder)と組み合わせるとさらに強力なので
個人的に用意しているエイリアスの紹介

```sh
alias nv='${ssd}/appimage/nvim.appimage'

function nf() {
        # change dir + open file with neovim
        local cmdarg=${1}
        [[ -z ${cmdarg} ]] && local fp=$(find . -type f | fzf --preview='less {}' --bind shift-up:preview-page-up,shift-down:preview-page-down)

        [[ -n ${cmdarg} ]]  && cd $(dirname ${cmdarg}) 2>/dev/null && nv "${cmdarg}"

        if [[ -n ${fp} ]];then
                cd $(dirname "${fp}")
                [[ $(ls | grep venv) == "venv" ]] && source 'venv/bin/activate'
                nv $(basename "${fp}" 2>/dev/null)
        fi

        # init.luaを編集した場合は、git管理ディレクトリへ飛ばす
        if [[ $(basename ${fp} 2>/dev/null ) == "init.lua" ]]; then
                cp -rp ~/.config/nvim/* "${dev}/vim"
        fi
}

alias nf=nf
```

以上
