import { Link, Outlet, useLocation } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingCart02Icon } from "@hugeicons/core-free-icons";
import { Home01Icon } from "@hugeicons/core-free-icons";

export default function MainLayout() {
	const { pathname } = useLocation();

	const navLinks = [
		{ to: "/", label: "Home", icon: <HugeiconsIcon icon={Home01Icon} size={18} /> },
		{ to: "/cart", label: "Cart", icon: <HugeiconsIcon icon={ShoppingCart02Icon} size={18} /> },
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Fixed Navbar */}
			<header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
				<div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
					{/* Brand */}
					<Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
						<span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-md text-sm">Shop</span>
						<span>E-Commerce</span>
					</Link>

					{/* Nav Links */}
					<nav className="flex items-center gap-1">
						{navLinks.map(({ to, label, icon }) => {
							const isActive = pathname === to;
							return (
								<Link
									key={to}
									to={to}
									className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:text-foreground hover:bg-muted"
										}`}
								>
									{icon}
									{label}
								</Link>
							);
						})}
					</nav>
				</div>
			</header>

			{/* Page Content */}
			<main className="pt-16 min-h-screen">
				<Outlet />
			</main>
		</div>
	);
}
