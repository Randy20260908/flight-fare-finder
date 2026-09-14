import { Route, Routes } from "react-router-dom";

import { RequireAuth } from "@/components/RequireAuth";
import AppPage from "@/pages/AppPage";
import AuthPage from "@/pages/AuthPage";
import LandingPage from "@/pages/LandingPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/*
        One auth screen, three entry points. /auth is what the existing UI links
        to; /sign-in and /sign-up just preselect the mode.
      */}
      <Route path="/auth" element={<AuthPage initialMode="signin" />} />
      <Route path="/sign-in" element={<AuthPage initialMode="signin" />} />
      <Route path="/sign-up" element={<AuthPage initialMode="signup" />} />

      <Route
        path="/app"
        element={
          <RequireAuth>
            <AppPage />
          </RequireAuth>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
