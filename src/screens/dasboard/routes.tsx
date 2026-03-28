// src/screens/dashboard/routes.tsx
import Lazy from "../../helper/lazy";
import { RoutesView } from "../../navigation/routes";

const Dashboard = Lazy(() => import("./index"));

export const DASHBOARD_ROUTES = [
    {
        path: RoutesView.DASHBOARD,
        element: <Dashboard />,
    },
];