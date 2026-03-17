import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="max-w-lg mx-auto px-4 py-24 flex flex-col items-center text-center gap-6">
			<p className="text-8xl font-black text-muted tracking-tight select-none">404</p>
			<div>
				<h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
				<p className="text-muted-foreground text-sm">
					The page you're looking for doesn't exist or has been moved.
				</p>
			</div>
			<Link
				to="/"
				className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
			>
				← Go Back Home
			</Link>
		</div>
	);
}
