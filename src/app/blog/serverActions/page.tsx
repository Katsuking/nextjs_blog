export default function SeverActionComponent() {
	return (
		<div className="p-10">
			{/* form>input*2 */}
			<form action="" className="flex flex-col max-w-xl mx-auto">
				<h1>Server Actions in Next.js</h1>
				<input
					type="text"
					className=" border border-gray-600 rounded-md p-2 m-2"
					placeholder="Product name"
				/>
				<input
					type="text"
					className=" border border-gray-600 rounded-md p-2 m-2"
					placeholder="Price"
				/>
				<button className="border border-green-500 bg-green-300 mx-2">
					Add product
				</button>
			</form>
		</div>
	);
}
