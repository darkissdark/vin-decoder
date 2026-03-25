import { Navigate, createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layout/Layout/Layout";
import { HomePage } from "@/pages/Home/HomePage";
import { NotFoundPage } from "@/pages/NotFound/NotFoundPage";
import { VariableDetailsPage } from "@/pages/VariableDetails/VariableDetailsPage";
import { VariablesPage } from "@/pages/Variables/VariablesPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/variables", element: <VariablesPage /> },
      { path: "/variables/:variableId", element: <VariableDetailsPage /> },
      { path: "/404", element: <NotFoundPage /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
]);
