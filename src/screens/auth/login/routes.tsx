// src/screens/dashboard/routes.tsx
import Lazy from "@/helper/lazy";
import { RoutesView } from "@/navigation/routes";
const Login = Lazy(() => import("./index"));

export const LOGIN_ROUTES = [
    {
        path: RoutesView.LOGIN,
        element: <Login />,
    },
];