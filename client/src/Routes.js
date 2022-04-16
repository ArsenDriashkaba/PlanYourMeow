import { Routes as RouterRoutes, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import WorkspaceListPage from "./pages/WorkspaceListPage/WorkspaceListPage";
import WorkspaceDetailPage from "./pages/WorkspaceDetailPage/WorkspaceDetailPage";
import TicketDetailPage from "./pages/TicketDetailPage/TicketDetailPage";
import MainPage from "./pages/MainPage/MainPage";

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<MainPage />} />
      <Route path="/workspaces" element={<WorkspaceListPage />} />
      <Route path="/workspaces/:id" element={<WorkspaceDetailPage />} />
      <Route path="/tickets/:id" element={<TicketDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
