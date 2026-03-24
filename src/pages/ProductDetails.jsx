import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { getProductById } from "../services/api";
import useAuthStore from "../store/useAuthStore";

const FALLBACK = "https://placehold.co/600x400";

export default function ProductDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = useAuthStore((state) => state.token);

	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError(null);

		getProductById(id)
			.then((res) => setProduct(res.data))
			.catch((err) => setError(err.message || "Failed to load product."))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) {
		return (
			<div className="flex justify-center items-center py-40">
				<div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	if (error || !product) {
		return (
			<div className="text-center py-32">
				<p className="text-lg font-semibold text-destructive mb-1">Product not found</p>
				<p className="text-sm text-muted-foreground mb-6">{error}</p>
				<button
					onClick={() => navigate("/")}
					className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer"
				>
					← Back to Home
				</button>
			</div>
		);
	}

	const mainImage = product.images?.[0] || FALLBACK;

	const handleAddToCart = () => {
		if (!token) {
			navigate("/login");
			return;
		}
		if (product) {
			dispatch(addToCart(product));
		}
	};

	return (
		<div className="max-w-4xl mx-auto px-4 py-12">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				{/* Image Gallery */}
				<div className="flex flex-col gap-3">
					<div className="rounded-2xl overflow-hidden bg-muted h-72">
						<img
							src={mainImage}
							alt={product.title}
							className="w-full h-full object-cover"
							onError={(e) => { e.target.src = FALLBACK; }}
						/>
					</div>
					{product.images?.length > 1 && (
						<div className="flex gap-2">
							{product.images.slice(1).map((img, i) => (
								<div key={i} className="w-20 h-20 rounded-xl overflow-hidden bg-muted border border-border">
									<img
										src={img}
										alt={`${product.title} ${i + 2}`}
										className="w-full h-full object-cover"
										onError={(e) => { e.target.src = FALLBACK; }}
									/>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Product Info */}
				<div className="flex flex-col gap-5">
					{/* Category Badge */}
					<span className="inline-block self-start bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full uppercase tracking-widest">
						{product.category?.name ?? "Uncategorized"}
					</span>

					<h1 className="text-2xl font-bold tracking-tight leading-snug">{product.title}</h1>

					<p className="text-3xl font-extrabold text-primary">${product.price.toFixed(2)}</p>

					<p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>

					{/* Meta */}
					<div className="grid grid-cols-2 gap-3 text-sm border-t border-border pt-4 mt-2">
						<div className="bg-muted rounded-xl p-3 flex flex-col gap-1">
							<span className="text-muted-foreground text-xs uppercase tracking-widest">Product ID</span>
							<span className="font-semibold font-mono">#{product.id}</span>
						</div>
						<div className="bg-muted rounded-xl p-3 flex flex-col gap-1">
							<span className="text-muted-foreground text-xs uppercase tracking-widest">Category</span>
							<span className="font-semibold">{product.category?.name}</span>
						</div>
					</div>

					{/* Actions */}
					<div className="mt-auto flex flex-wrap items-center gap-3">
						<button
							onClick={handleAddToCart}
							className="flex items-center gap-2 px-6 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer"
						>
							🛒 Add to Cart
						</button>
						<button
							onClick={() => navigate("/")}
							className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer"
						>
							← Back to Home
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
