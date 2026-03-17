import { Link } from "react-router-dom";

export default function Cart() {
	return (
		<div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center text-center gap-6">
			<div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-5xl select-none">
				🛒
			</div>
			<div>
				<h1 className="text-3xl font-bold tracking-tight mb-2">Your Cart</h1>
				<p className="text-muted-foreground">
					Your cart is currently empty. Start shopping to add items!
				</p>
			</div>
			<Link
				to="/"
				className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
			>
				← Continue Shopping
			</Link>
		</div>
	);
}
