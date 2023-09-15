import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import Link from "next/link";
import articleList from "./article_list.js";

export default function Home() {
	return (
		<div>
			<Header />
			<h2 className="flex px-3 py-4">日々の学習のアウトプット</h2>
			{/* <GetPosts /> */}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{articleList.map((el) => (
					<article key={el.title} className="py-2 px-10 hover:text-violet-500">
						<div className="bg-gray-200 rounded-lg p-4 border border-blue-400 shadow-lg">
							<Link href={el.link}>
								<h2 className="flex justify-center font-bold">{el.title}</h2>
								<p className="text-sm text-slate-700">{el.subtitle}</p>
								<p className="text-sm text-slate-400">{el.date}</p>
							</Link>
						</div>
					</article>
				))}
			</div>
			<Footer />
		</div>
	);
}
