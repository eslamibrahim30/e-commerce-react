import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";

const FALLBACK = "https://placehold.co/600x400";

export default function Cart() {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.cartItems);

	if (cartItems.length === 0) {
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

	const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="max-w-3xl mx-auto px-4 py-10">
			<h1 className="text-3xl font-bold tracking-tight mb-8">Your Cart</h1>

			<ul className="flex flex-col gap-4">
				{cartItems.map((item) => {
					const imageUrl = item.images?.[0] || FALLBACK;
					return (
						<li
							key={item.id}
							className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4"
						>
							{/* Thumbnail */}
							<img
								src={imageUrl}
								alt={item.title}
								className="w-20 h-20 object-cover rounded-xl flex-shrink-0 bg-muted"
								onError={(e) => { e.target.src = FALLBACK; }}
							/>

							{/* Info */}
							<div className="flex-1 min-w-0">
								<p className="font-semibold text-sm leading-snug truncate">{item.title}</p>
								<p className="text-xs text-muted-foreground capitalize mt-0.5">
									{item.category?.name ?? item.category}
								</p>
								<p className="text-base font-bold mt-1">
									${(item.price * item.quantity).toFixed(2)}
									{item.quantity > 1 && (
										<span className="ml-1 text-xs font-normal text-muted-foreground">
											(${item.price.toFixed(2)} × {item.quantity})
										</span>
									)}
								</p>
							</div>

							{/* Quantity Controls + Remove */}
							<div className="flex items-center gap-2 flex-shrink-0">
								<button
									onClick={() => dispatch(removeFromCart(item.id))}
									className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted text-foreground text-lg font-bold hover:bg-destructive hover:text-white transition-colors"
									aria-label="Decrease quantity"
								>
									−
								</button>
								<span className="w-6 text-center font-semibold text-sm">
									{item.quantity}
								</span>
								<button
									onClick={() => dispatch(addToCart(item))}
									className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted text-foreground text-lg font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
									aria-label="Increase quantity"
								>
									+
								</button>
							</div>
						</li>
					);
				})}
			</ul>

			{/* Summary */}
			<div className="mt-8 flex items-center justify-between border-t border-border pt-6">
				<div className="text-muted-foreground text-sm">
					{cartItems.reduce((sum, item) => sum + item.quantity, 0)} item(s)
				</div>
				<div className="text-xl font-bold">
					Total: ${total.toFixed(2)}
				</div>
			</div>

			<Link
				to="/"
				className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
			>
				← Continue Shopping
			</Link>
		</div>
	);
}
