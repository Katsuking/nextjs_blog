import Image from "next/image";

export default function Content() {
	return (
		<div className="container mx-auto py-6">
			<div className="bg-white rounded-lg shadow-lg p-6 lg:text-center lg:items-center">
				<h1 className="text-2xl font-bold mb-4 ">フロントエンドに触れたい</h1>
				<p className="text-gray-600 mb-4 font-serif">Published on July 1, 2023</p>
				<Image
					className="mb-4 lg:mx-auto"
					width={200}
					height={220}
					src="/images/flower.jpg"
					alt="Article"
				/>
				<div className="bg-white rounded-lg">
					<p className="p-1 tracking-widest dark:text-slate-800">
						私は基本的にバックエンドの開発に魅力を感じています。データベースの設計やサーバーサイドの処理など、バックエンドの世界ではデータやシステムの裏側を支える役割を担います。しかし、最近ではさまざまなエンジニアとの交流や学習の中で、フロントエンドにも興味を抱くようになりました。
                        このブログ自体は、最近流行りのNext.jsを使っています。
					</p>
					<p className="p-1 tracking-widest dark:text-slate-800">
						フロントエンドの魅力の一つである表現力。デザインやアニメーション、インタラクティブな要素を駆使することで、ユーザーに魅力的な体験を提供することができます。
                        このブログでは、Hooks等はもちろん、Reactの強みを活かしたNext.jsの様々な仕組みやTailwindcssに少しでも慣れていくことが目的です。
					</p>
				</div>
			</div>
		</div>
	);
}
