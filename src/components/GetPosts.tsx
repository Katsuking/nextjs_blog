import fs from 'fs'
import matter from 'gray-matter';
import Link from 'next/link';
import { PostMetadata } from './Postmetadata';

const getPostMetadata = (): PostMetadata[] => {
    // postsディレクトリからmarkdownの取得
    const folder = "posts/";
    const files = fs.readdirSync(folder);
    // console.log(files); // npx ts-node --esm  GetPosts.ts
    const mkPosts = files.filter(file => file.endsWith(".md"));

    // markdownからmetadataの取得
    const posts = mkPosts.map(fileName => {
        const fileContents = fs.readFileSync(`posts/${fileName}`, "utf-8");
        const matterResult = matter(fileContents);
        // console.log(matterResult.data.title);
        return {
            title: matterResult.data.title,
            date: matterResult.data.date,
            subtitle: matterResult.data.subtitle,
            slug: fileName.replace(".md", ""),
        };
    });
    return posts;
};

const GetPosts = () => {
    const postMetaData = getPostMetadata();
    const postPreviews = postMetaData.map((post) => (
        <article key={post.slug} {...post} className='py-2 px-10 hover:text-violet-500'>
            <div className="bg-gray-200 rounded-lg p-4 border border-blue-400 shadow-lg">
                <Link href={`/posts/${post.slug}`}>
                <h2 className='flex justify-center font-bold'>{post.title}</h2>
                <p className='text-sm text-slate-700'>{post.subtitle}</p>
                <p className='text-sm text-slate-400'>{post.date}</p>
                </Link>
            </div>
        </article>
    ));

    return <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>{postPreviews}</div>
};


export default GetPosts;

