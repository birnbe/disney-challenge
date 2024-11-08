import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { UserProvider } from "./contexts/UserContext";
import { DisneyCharacterProvider } from "./contexts/DisneyCharacterContext";
import App from "./App.tsx";
import UserProfile from "./UserProfile.tsx";
import CharacterDetail from "./CharacterDetail.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DisneyCharacterProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:charId" element={<CharacterDetail />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
      </DisneyCharacterProvider>
    </QueryClientProvider>
  </StrictMode>
);
