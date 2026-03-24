# E-Commerce React App

A modern, responsive e-commerce front-end application built with React, showcasing product browsing, an interactive shopping cart, theme switching, and form validation.

## 🚀 Live Deployments

The application is configured with a dual CI/CD pipeline and is continuously deployed to both GitHub Pages and Cloudflare Pages:

- **Cloudflare Pages:** [https://e-commerce-react-5ks.pages.dev/](https://e-commerce-react-5ks.pages.dev/)
- **GitHub Pages:** [https://eslamibrahim30.github.io/e-commerce-react/](https://eslamibrahim30.github.io/e-commerce-react/)

## ✨ Features

- **Product Management:** Browse a catalogue of products and view individual product details (integrated with a fake store API).
- **Shopping Cart:** Add, remove, and manage cart items dynamically with persistent state using Redux Toolkit.
- **Global Theme Support:** Toggle between Light and Dark modes seamlessly using Zustand for state management.
- **Dynamic Routing:** Client-side navigation powered by React Router for smooth transitions between Listing, Details, Cart, and 404 pages.
- **Form Validation:** Secure and robust form handling (e.g., Login) using React Hook Form paired with Zod schema validation.
- **Responsive UI:** Modern, accessible, and highly responsive components designed with Tailwind CSS v4 and shadcn/ui.

## 🛠️ Technologies Used

- **Framework:** React 19, Vite
- **Routing:** React Router DOM
- **State Management:**
  - Redux Toolkit & React Redux (Cart state)
  - Zustand (Theme state)
- **Styling & UI:**
  - Tailwind CSS (v4)
  - shadcn/ui & @base-ui/react
  - @hugeicons/react (Icons)
- **Forms & Validation:** React Hook Form, Zod
- **Networking:** Axios
- **Code Quality:** ESLint

## 💻 Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.