import React, { useState } from "react";
import Hider from "./Hider";
import Seeker from "./Seeker";

export default function MainMenu() {
  const [team, setTeam] = useState(null);

  if (!team) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <h1 className="text-xl font-bold mb-4">Wähle dein Team</h1>
        <button
          onClick={() => setTeam("hider")}
          className="btn m-2 p-2 border rounded bg-blue-500 text-white"
        >
          Hider
        </button>
        <button
          onClick={() => setTeam("seeker")}
          className="btn m-2 p-2 border rounded bg-green-500 text-white"
        >
          Seeker
        </button>
      </div>
    );
  }

  if (team === "hider") {
    // Übergibt die Funktion setTeam(null) als onReset an Hider
    return <Hider onReset={() => setTeam(null)} />;
  }

  if (team === "seeker") {
    // Hier kannst du Seeker auch mit onReset versorgen (optional)
    return <Seeker onReset={() => setTeam(null)} />;
  }
}
