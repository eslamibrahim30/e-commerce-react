import { Link, Outlet, useLocation } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingCart02Icon } from "@hugeicons/core-free-icons";
import { Home01Icon } from "@hugeicons/core-free-icons";
import { useSelector } from "react-redux";
import useThemeStore from "../store/useThemeStore";
import { useLanguage } from '../context/LanguageContext';
import useAuthStore from "../store/useAuthStore";

export default function MainLayout() {
	const { pathname } = useLocation();
	const { theme, toggleTheme } = useThemeStore();

	const { lang, toggleLanguage } = useLanguage();
	const token = useAuthStore((state) => state.token);

	const cartCount = useSelector((state) =>
		state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
	);

	const t = {
		en: { home: "Home", cart: "Cart", brand: "Shop", dark: "Dark", light: "Light" },
		ar: { home: "الرئيسية", cart: "السلة", brand: "متجر", dark: "ليلي", light: "نهاري" }
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Fixed Navbar */}
			<header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
				<div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

					<Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
						<span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-md text-sm">
							{t[lang].brand}
						</span>
						<span>{lang === "en" ? "Welcome" : "مرحبا"}</span>
					</Link>

					<nav className="flex items-center gap-1">
						<Link
							to="/"
							className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === "/"
									? "bg-primary text-primary-foreground"
									: "text-muted-foreground hover:text-foreground hover:bg-muted"
								}`}
						>
							<HugeiconsIcon icon={Home01Icon} size={18} />
							{t[lang].home}
						</Link>

						{/* Cart Link with badge */}
						<Link
							to="/cart"
							className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === "/cart"
									? "bg-primary text-primary-foreground"
									: "text-muted-foreground hover:text-foreground hover:bg-muted"
								}`}
						>
							<HugeiconsIcon icon={ShoppingCart02Icon} size={18} />
							{t[lang].cart}
							{cartCount > 0 && (
								<span className="ml-1 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-destructive text-white text-xs font-bold">
									{cartCount}
								</span>
							)}
						</Link>

						<button
							onClick={toggleLanguage}
							className="ml-2 px-3 py-2 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors"
						>
							{lang === "en" ? "العربية" : "English"}
						</button>

						{/* Theme Toggle Button */}
						<button
							onClick={toggleTheme}
							className="ml-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
							aria-label="Toggle theme"
						>
							{theme === "light" ? `🌙 ${t[lang].dark}` : `☀️ ${t[lang].light}`}
						</button>

						{token ? (
							<div className="ml-2 flex flex-col items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/20" title="User Profile">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
								</svg>
							</div>
						) : (
							<Link
								to="/login"
								className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
							>
								Login
							</Link>
						)}
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