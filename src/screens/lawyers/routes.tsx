// src/screens/lawyers/routes.tsx
import Lazy from "@/helper/lazy";
import { RoutesView } from "@/navigation/routes";

const LawyersPage = Lazy(() => import("./index"));

export const LAWYERS_ROUTES = [
  {
    path: RoutesView.LAWYERS,
    element: <LawyersPage />,
  },
];
