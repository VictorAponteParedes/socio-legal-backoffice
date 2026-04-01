// src/screens/clients/routes.tsx
import Lazy from "@/helper/lazy";
import { RoutesView } from "@/navigation/routes";

const ClientsList = Lazy(() => import("./list/index"));
const ClientDetail = Lazy(() => import("./detail/index"));

export const CLIENTS_ROUTES = [
  {
    path: RoutesView.CLIENTS,
    element: <ClientsList />,
  },
  {
    path: RoutesView.CLIENTS_DETAIL,
    element: <ClientDetail />,
  },
];
