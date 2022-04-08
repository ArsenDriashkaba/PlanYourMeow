import { Routes as RouterRoutes, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import WorkspaceListPage from "./pages/WorkspaceListPage/WorkspaceListPage";

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/workspaces" element={<WorkspaceListPage />} />
      {/* <Route path="/workspace/:id" element={<RecipeDetailPage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
