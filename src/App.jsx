import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
	[
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <ProductsList />
			},
			{
				path: "product/:id",
				element: <ProductDetails />
			},
			{
				path: "cart",
				element: (
					<ProtectedRoute>
						<Cart />
					</ProtectedRoute>
				)
			},
			{
				path: "login",
				element: <Login />
			},
			{
				path: "*",
				element: <NotFound />
			},
		],
	},
	],
	{ basename: import.meta.env.BASE_URL },
);

export default function App() {
	return <RouterProvider router={router} />;
}
