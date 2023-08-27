import Footer from "@/components/Footer";
import GetPosts from "@/components/GetPosts";
import Header from "@/components/Header/Header";
import Link from "next/link";

const articleList = [
  {
    title: "フロントエンドに触れたい",
    subtitle: "why blog?",
    date: "2023/07/01",
  },
];

export default function Home() {
  return (
    <body>
      <Header />
      <h2 className="flex px-3 py-4">日々の学習のアウトプット</h2>
      {/* <GetPosts /> */}

      {articleList.map((el) => (
        <article className="py-2 px-10 hover:text-violet-500">
          <div className="bg-gray-200 rounded-lg p-4 border border-blue-400 shadow-lg">
            <Link href="/blog/why_blog">
              <h2 className="flex justify-center font-bold">
                {el.title}
              </h2>
              <p className="text-sm text-slate-700">{el.subtitle}</p>
              <p className="text-sm text-slate-400">{el.date}</p>
            </Link>
          </div>
        </article>
      ))}
      <Footer />
    </body>
  );
}
