import { useState } from "react";

export default function Seeker() {
  const [view, setView] = useState("menu"); // "menu", "questions", "notes"
  
  // Gruppen-Buttons für Fragen
  const questionGroups = [
    "Vergleiche",
    "Präzisionstrage",
    "Fotos",
    "Maße",
    "Thermometer",
    "Radar",
  ];

  return (
    <div className="max-w-md mx-auto p-4 text-center min-h-screen flex flex-col">
      {view === "menu" && (
        <>
          <h1 className="text-xl font-bold mb-6">Seeker Startseite</h1>
          <button
            onClick={() => setView("questions")}
            className="btn p-3 mb-4 bg-blue-600 text-white rounded"
          >
            Fragen
          </button>
          <button
            onClick={() => alert("Notizen sind noch nicht implementiert")}
            className="btn p-3 bg-gray-500 text-white rounded"
          >
            Notizen
          </button>
        </>
      )}

      {view === "questions" && (
        <>
          <button
            onClick={() => setView("menu")}
            className="btn p-2 mb-6 bg-gray-300 rounded hover:bg-gray-400"
          >
            ← Zurück zur Auswahl
          </button>

          <h2 className="text-lg font-semibold mb-4">Fragegruppen</h2>
          <div className="flex flex-col gap-3">
            {questionGroups.map((group) => (
              <button
                key={group}
                onClick={() => alert(`Gruppe ${group} ausgewählt`)}
                className="btn p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {group}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
