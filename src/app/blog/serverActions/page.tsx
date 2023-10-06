// mockapi.io を使って、確認
// https://65043094c8869921ae24a9a1.mockapi.io/nextjs/products

import { revalidateTag } from "next/cache";
import { useState } from "react";

export default async function SeverActionComponent() {
	const res = await fetch(
		"https://65043094c8869921ae24a9a1.mockapi.io/nextjs/products",
		{
			cache: "no-store",
			next: { tags: ["products"] },
		}
	);
	const data = await res.json();

	// server actions
	const addNewProduct = async (e: FormData) => {
		"use server";
		const product = e.get("product")?.toString();
		const price = e.get("price")?.toString();

		if (!product || !price) return;

		// create object for POST
		const newProduct = {
			product: product, // no need to write this if key and value are the same.
			price,
		};

		await fetch("https://65043094c8869921ae24a9a1.mockapi.io/nextjs/products", {
			method: "POST",
			body: JSON.stringify(newProduct),
			headers: {
				"Content-Type": "application/json",
			},
		});

		// use Server;
		revalidateTag("products");
	};

	return (
		<div className="p-10">
			{/* form>input*2 */}
			<form action={addNewProduct} className="flex flex-col max-w-xl mx-auto">
				<h1>Server Actions in Next.js. Experimental feature.</h1>
				<p>Sveltekit is way easier...</p>
				<input
					name="product"
					className=" border border-gray-600 rounded-md p-2 m-2"
					placeholder="Product name"
				/>
				<input
					name="price"
					className=" border border-gray-600 rounded-md p-2 m-2"
					placeholder="Price"
				/>
				<button className="border border-green-500 bg-green-300 mx-2">
					Add product
				</button>
			</form>
			{/* <div>{JSON.stringify(data)}</div>; */}
			<div className="py-4">
				{/* type Product = {}でTS活かさんのかい! */}
				{data.map((el: any, i: any) => (
					<div key={el.id}>
						<p>
							Product: {el.product} Price: {Number(el.price)}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
