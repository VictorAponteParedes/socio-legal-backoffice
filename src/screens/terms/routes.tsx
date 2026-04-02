import type { RouteObject } from "react-router-dom";
import TermsListPage from "./list";

export const TERMS_ROUTES: RouteObject[] = [
  {
    path: "admin/terminos",
    element: <TermsListPage />,
  },
];
