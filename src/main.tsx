import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { UserProvider } from "./contexts/UserContext";
import SearchHeader from "./components/SearchHeader";
import Footer from "./components/Footer";
import { DisneyCharacterProvider } from "./contexts/DisneyCharacterContext";
import App from "./App.tsx";
import UserProfile from "./UserProfile.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DisneyCharacterProvider>
        <UserProvider>
          <BrowserRouter>
            <SearchHeader />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/:charId" element={<App isDetail={true} />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </UserProvider>
      </DisneyCharacterProvider>
    </QueryClientProvider>
  </StrictMode>
);
