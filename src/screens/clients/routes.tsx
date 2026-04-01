// src/screens/clients/routes.tsx
import Lazy from "@/helper/lazy";
import { RoutesView } from "@/navigation/routes";

const ClientsList = Lazy(() => import("./list/index"));

export const CLIENTS_ROUTES = [
  {
    path: RoutesView.CLIENTS,
    element: <ClientsList />,
  },
];
