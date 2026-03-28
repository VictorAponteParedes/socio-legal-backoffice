// src/screens/dashboard/routes.tsx
import Lazy from "../../helper/lazy";
import { RoutesView } from "../../navigation/routes";

const Dashboard = Lazy(() => import("./index"));

export const NOTFOUND_ROUTES = [
    {
        path: RoutesView.NOTFOUND,
        element: <Dashboard />,
    },
];