import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head></head>
			<body>
				<Navbar />
				<div>{children}</div>
				<Footer />
			</body>
		</html>
	);
}
