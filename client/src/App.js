import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import AppHome from "./pages/common/AppHome";
import AppEvents from "./pages/common/AppEvents";
import AppPosts from "./pages/common/AppPosts";
import ArtistList from "./pages/common/ArtistList";
import UserProfile from "./pages/common/UserProfile";
import MyProfile from "./pages/common/MyProfile";
import NotFound from "./pages/NotFound";
import AppFooter from "./components/AppFooter";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import Onboarding from "./pages/auth/Onboarding";
import EmailVerification from "./pages/auth/EmailVerification";

function AppRoutes() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/onboarding" || location.pathname === "/email-verification";
  return (
    <>
      {!hideNavbar && <AppNavbar />}
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/events" element={<AppEvents />} />
        <Route path="/posts" element={<AppPosts />} />
        <Route path="/artists" element={<ArtistList />} />
        <Route path="/artist/:id" element={<UserProfile />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        {/* Add more routes for other pages here */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AppFooter />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
