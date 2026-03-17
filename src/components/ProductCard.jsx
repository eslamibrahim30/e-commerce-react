import { Link } from "react-router-dom";

const FALLBACK = "https://placehold.co/600x400";

export default function ProductCard({ id, title, price, category, images }) {
    const imageUrl = images?.[0] || FALLBACK;

    return (
        <div className="group relative bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            {/* Product Image */}
            <div className="bg-muted flex items-center justify-center h-44 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = FALLBACK; }}
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Category Badge */}
                <span className="inline-block self-start bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-0.5 rounded-full capitalize">
                    {category?.name ?? category}
                </span>

                <h2 className="font-semibold text-base leading-snug">{title}</h2>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-lg font-bold">${price.toFixed(2)}</span>
                    <Link
                        to={`/product/${id}`}
                        className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        View Details →
                    </Link>
                </div>
            </div>
        </div>
    );
}
