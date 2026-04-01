// src/screens/cases/routes.tsx
import Lazy from "@/helper/lazy";
import { RoutesView } from "@/navigation/routes";

const CasesList = Lazy(() => import("./list/index"));
const CaseDetail = Lazy(() => import("./detail/index"));

export const CASES_ROUTES = [
  {
    path: RoutesView.CASES,
    element: <CasesList />,
  },
  {
    path: RoutesView.CASES_DETAIL,
    element: <CaseDetail />,
  },
];
