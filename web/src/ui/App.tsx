import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import { ThemeProvider } from "./lib/theme";
import { RootLayout } from "./layout/RootLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { PlannerPage } from "./pages/PlannerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "planner", element: <PlannerPage /> },
    ],
  },
]);

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
