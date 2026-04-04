import { lazy } from "react";
import { RoutesView } from "@/navigation/routes";

const RegistryList = lazy(() => import("./index"));

export const REGISTRY_ROUTES = [
  {
    path: RoutesView.REGISTRY,
    element: <RegistryList />,
  },
];
