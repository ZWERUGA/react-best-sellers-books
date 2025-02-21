import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import "normalize.css";
import "./index.css";

import App from "./App.jsx";
import BestSellersNames from "./Pages/Best-Sellers-Names/Best-Sellers-Names.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<BestSellersNames />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
