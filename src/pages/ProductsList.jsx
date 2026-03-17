import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts, getCategories } from "../services/api";

// categoryId must be a positive integer string — digits only, no symbols.
const isValidCategoryId = (id) => {
	if (typeof id !== "string") return false;
	const num = Number(id);
	return Number.isInteger(num) && num > 0;
};

// Category name: English letters and spaces only (1–100 chars).
const SAFE_CATEGORY_NAME = /^[a-zA-Z ]{1,100}$/;

// Validates a category object returned from the API.
const isValidCategory = (cat) => {
	if (!cat || typeof cat !== "object") return false;
	if (!Number.isInteger(cat.id) || cat.id <= 0) return false;
	if (typeof cat.name !== "string") return false;
	// Strict English-only allowlist — anything else is silently dropped.
	return SAFE_CATEGORY_NAME.test(cat.name.trim());
};

export default function ProductsList() {
	const [searchParams, setSearchParams] = useSearchParams();
	// Only use categoryId if it passes validation — reject arbitrary/malicious strings.
	const rawCategoryId = searchParams.get("categoryId");
	const categoryId = isValidCategoryId(rawCategoryId) ? rawCategoryId : null;

	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		getCategories()
			.then((res) => {
				// Filter out any API responses that don't conform to expected shape.
				const safe = Array.isArray(res.data)
					? res.data.filter(isValidCategory)
					: [];
				setCategories(safe);
			})
			.catch(() => { });
	}, []);

	useEffect(() => {
		setLoading(true);
		setError(null);

		const params = categoryId ? { categoryId } : {};

		getProducts(params)
			.then((res) => setProducts(res.data))
			.catch((err) => setError(err.message || "Failed to load products."))
			.finally(() => setLoading(false));
	}, [categoryId]);

	const activeCategory = categories.find((c) => String(c.id) === categoryId);
	const heading = activeCategory ? `Browsing: ${activeCategory.name}` : "All Products";

	const handleFilter = (id) => {
		if (id == null) {
			setSearchParams({});
			return;
		}
		// Validate the id before writing it to the URL to prevent injected values.
		const strId = String(id);
		if (!isValidCategoryId(strId)) {
			console.warn("[handleFilter] Rejected invalid category id:", id);
			return;
		}
		setSearchParams({ categoryId: strId });
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-10">
			{/* Heading */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight mb-1">{heading}</h1>
				{!loading && !error && (
					<p className="text-muted-foreground text-sm">{products.length} products found</p>
				)}
			</div>

			{/* Filter Buttons */}
			<div className="flex flex-wrap gap-2 mb-8">
				<button
					onClick={() => handleFilter(null)}
					className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${!categoryId
						? "bg-primary text-primary-foreground border-primary"
						: "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
						}`}
				>
					All Products
				</button>
				{categories.map((cat) => {
					const isActive = String(cat.id) === categoryId;
					return (
						<button
							key={cat.id}
							onClick={() => handleFilter(cat.id)}
							className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${isActive
								? "bg-primary text-primary-foreground border-primary"
								: "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
								}`}
						>
							{cat.name}
						</button>
					);
				})}
			</div>

			{/* States */}
			{loading && (
				<div className="flex justify-center items-center py-24">
					<div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
				</div>
			)}

			{error && (
				<div className="text-center py-20 text-destructive">
					<p className="text-lg font-semibold mb-1">Something went wrong</p>
					<p className="text-sm text-muted-foreground">{error}</p>
				</div>
			)}

			{!loading && !error && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((product) => (
						<ProductCard key={product.id} {...product} />
					))}
				</div>
			)}
		</div>
	);
}
