import { Routes as RouterRoutes, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import WorkspaceListPage from "./pages/WorkspaceListPage/WorkspaceListPage";
import WorkspaceDetailPage from "./pages/WorkspaceDetailPage/WorkspaceDetailPage";

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/workspaces" element={<WorkspaceListPage />} />
      <Route path="/workspaces/:id" element={<WorkspaceDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
