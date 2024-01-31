import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import DefaultLayout from "./layouts/DefaultLayout";
import MoviesDetailPage from "./pages/MoviesDetailPage";
import { useState } from "react";
import { AuthProvider } from "./contexts/Auth.context";
import { ProfileProvider } from "./contexts/Profile.context";
import MyPage from "./pages/Mypage/MyPage";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/movies/:movieId" element={<MoviesDetailPage />} />
            <Route path="/my-page" element={<MyPage />} />
          </Route>
        </Routes>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
