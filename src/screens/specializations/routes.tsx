// src/screens/specializations/routes.tsx
import { RoutesView } from "@/navigation/routes";
import Lazy from "@/helper/lazy";

const SpecializationsList = Lazy(() => import("./list"));

export const SPECIALIZATIONS_ROUTES = [
  {
    path: RoutesView.SPECIALIZATIONS,
    element: <SpecializationsList />,
  },
];
