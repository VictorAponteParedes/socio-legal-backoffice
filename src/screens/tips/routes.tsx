// src/screens/tips/routes.tsx
import { RoutesView } from "@/navigation/routes";
import Lazy from "@/helper/lazy";

const TipsList = Lazy(() => import("./list"));

export const TIPS_ROUTES = [
  {
    path: RoutesView.TIPS,
    element: <TipsList />,
  },
];
