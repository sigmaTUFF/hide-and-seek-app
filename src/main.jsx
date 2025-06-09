import React from "react";
import ReactDOM from "react-dom/client";
import MainMenu from "./MainMenu";  // Hier importierst du deine Hauptkomponente
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainMenu />  {/* Deine Hauptkomponente */}
  </React.StrictMode>
);
