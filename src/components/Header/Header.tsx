import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
	return (
		<header className="bg-black text-white whitespace-normal m-3 rounded-md sticky">
			<nav className="container mx-auto flex items-center justify-between py-4">
				<Image
					src="/outer_space.png"
					width={100}
					height={40}
					alt="my logo"
					className="object-contain"
				/>
				<Link href="/">
					<div className="text-2xl font-semibold px-2 hover:text-violet-400 font-mono">
						My playground/*
					</div>
				</Link>
				<ul className="flex pr-3">
					<li className="text-lg">
						<Link
							href="/"
							className="flex hover:text-violet-400 transition-colors duration-300 pr-3 font-mono"
						>
							Home
						</Link>
					</li>
					<li className="text-lg">
						<Link
							href="/About"
							className="flex hover:text-violet-400 transition-colors duration-300 pr-3 font-mono"
						>
							About me
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
