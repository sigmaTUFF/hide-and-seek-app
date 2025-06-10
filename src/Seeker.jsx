import { useState, useEffect } from "react";

const compareOptions = [
  "Spielplatz",
  "Bahnhof",
  "Bushaltestelle",
  "Sportplatz",
  "Museum",
  "Rathaus",
  "Kirche",
  "Apotheke",
  "Restaurant",
  "Lebensmittelladen",
  "Arztpraxis",
  "Schule",
  "Kindergarten",
  "See",
];

export default function Seeker() {
  const [view, setView] = useState("menu"); // menu, fragen, notizen, vergleiche
  const [usedCompareOptions, setUsedCompareOptions] = useState(() => {
    // Lade gespeicherte Optionen aus localStorage beim Start
    const saved = localStorage.getItem("usedCompareOptions");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCompareCard, setSelectedCompareCard] = useState(null);

  // Speichere usedCompareOptions bei jeder Änderung im localStorage
  useEffect(() => {
    localStorage.setItem("usedCompareOptions", JSON.stringify(usedCompareOptions));
  }, [usedCompareOptions]);

  // Funktion um Vergleichsfrage-Button zu verwenden mit Bestätigung
  const useCompareOption = (option) => {
    if (window.confirm(`Willst du die Frage mit "${option}" wirklich verwenden?`)) {
      setSelectedCompareCard(
        `Ist dein nächster ${option.toUpperCase()} derselbe wie mein nächster ${option.toUpperCase()}?`
      );
      setUsedCompareOptions((prev) => [...prev, option]);
    }
  };

  // Hilfsfunktion ob Button deaktiviert sein soll
  const isOptionUsed = (option) => usedCompareOptions.includes(option);

  // Reset-Funktion: Löscht alle gespeicherten Daten und setzt States zurück
  const resetAll = () => {
    if (window.confirm("Willst du wirklich alle gespeicherten Daten zurücksetzen?")) {
      localStorage.removeItem("usedCompareOptions");
      setUsedCompareOptions([]);
      setSelectedCompareCard(null);
      setView("menu");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center min-h-screen flex flex-col">
      {view === "menu" && (
        <>
          <h1 className="text-2xl font-bold mb-6">Seeker Hauptmenü</h1>
          <button
            onClick={() => setView("fragen")}
            className="btn p-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Fragen
          </button>
          <button
            onClick={() => setView("notizen")}
            className="btn p-2 mb-4 bg-gray-400 text-white rounded"
          >
            Notizen
          </button>
        </>
      )}

      {view === "fragen" && (
        <>
          <button
            onClick={() => setView("menu")}
            className="btn p-2 mb-6 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zur Auswahl
          </button>

          <h2 className="text-xl font-semibold mb-4">Fragen-Kategorien</h2>

          <button
            onClick={() => setView("vergleiche")}
            className="btn p-3 mb-2 w-full bg-green-600 text-white rounded hover:bg-green-700"
          >
            Vergleiche
          </button>

          <button
            onClick={() => alert("Noch nicht implementiert")}
            className="btn p-3 mb-2 w-full bg-gray-400 text-white rounded cursor-not-allowed"
            disabled
          >
            Präzisionsfrage
          </button>

          <button
            onClick={() => alert("Noch nicht implementiert")}
            className="btn p-3 mb-2 w-full bg-gray-400 text-white rounded cursor-not-allowed"
            disabled
          >
            Fotos
          </button>

          <button
            onClick={() => alert("Noch nicht implementiert")}
            className="btn p-3 mb-2 w-full bg-gray-400 text-white rounded cursor-not-allowed"
            disabled
          >
            Maße
          </button>

          <button
            onClick={() => alert("Noch nicht implementiert")}
            className="btn p-3 mb-2 w-full bg-gray-400 text-white rounded cursor-not-allowed"
            disabled
          >
            Thermometer
          </button>

          <button
            onClick={() => alert("Noch nicht implementiert")}
            className="btn p-3 mb-2 w-full bg-gray-400 text-white rounded cursor-not-allowed"
            disabled
          >
            Radar
          </button>
        </>
      )}

      {view === "vergleiche" && (
        <>
          <button
            onClick={() => {
              setView("fragen");
              setSelectedCompareCard(null);
              // setUsedCompareOptions([]); // nicht zurücksetzen hier, wird nur beim Reset gemacht
            }}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zu Fragen
          </button>

          <h2 className="text-xl font-semibold mb-2">Vergleiche</h2>
          <p className="mb-1 font-semibold">Preis: Der Verstecker darf 2 Karten ziehen</p>
          <p className="mb-4 italic">Beispiel: Ist dein nächster ___ derselbe wie mein nächster ___?</p>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {compareOptions.map((option) => (
              <button
                key={option}
                onClick={() => useCompareOption(option)}
                disabled={isOptionUsed(option)}
                className={`p-2 rounded border ${
                  isOptionUsed(option)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedCompareCard && (
            <div className="border rounded p-4 bg-white shadow text-lg font-bold max-w-xl mx-auto">
              {selectedCompareCard}
            </div>
          )}
        </>
      )}

      {view === "notizen" && (
        <div>
          <button
            onClick={() => setView("menu")}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zur Auswahl
          </button>
          <p>Notizen werden noch implementiert.</p>
          <button
            onClick={resetAll}
            className="btn p-2 mt-4 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reset alle gespeicherten Fragen
          </button>
        </div>
      )}
    </div>
  );
}
