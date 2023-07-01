import fs from "fs";

const GetPostContent = (slug: string) => {
    // posts/ディレクトリのmdファイルを取得
    const folder = "posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf-8");
    return content;
}

export default GetPostContent

