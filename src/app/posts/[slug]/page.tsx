import GetPostContent from "@/components/GetPostContent";
import Markdown from "markdown-to-jsx";


export default function PostPage(props:any) {
    const slug = props.params.slug;
    const content = GetPostContent(slug);
    return <article className="prose lg:prose-xl p-5">
        <Markdown>{content}</Markdown>
        </article>
}

