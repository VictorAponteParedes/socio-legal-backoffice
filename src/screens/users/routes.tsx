// src/screens/users/routes.tsx
import { RoutesView } from "@/navigation/routes";
import Lazy from "@/helper/lazy";

const UsersList = Lazy(() => import("./list"));

export const USERS_ROUTES = [
  {
    path: RoutesView.USERS,
    element: <UsersList />,
  },
];
