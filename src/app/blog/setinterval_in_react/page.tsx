"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SetInterval_in_react = () => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		setInterval(() => {
			// console.log(count);
			setCount((prev) => prev + 1); // prev 前の状態保持
		}, 1000);
	}, []);

	return (
		<div className="p-10">
			<Link href="/" className="underline text-emerald-500">
				home
			</Link>
			<h1>Count how long you stay here</h1>
			<p className="text-center text-[45px]">{count}</p>
		</div>
	);
};

export default SetInterval_in_react;
