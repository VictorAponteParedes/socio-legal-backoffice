// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./navigation/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;