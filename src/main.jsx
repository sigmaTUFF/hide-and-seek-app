import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./MainMenu";      // ← dein Hauptmenü
import Hider from "./Hider";            // ← der Code von oben

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/hider" element={<Hider />} />
      </Routes>
    </BrowserRouter>
  );
}
