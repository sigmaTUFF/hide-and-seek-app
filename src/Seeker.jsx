import { useState } from "react";

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
  const [usedQuestions, setUsedQuestions] = useState([]); // zentrale Speicherung aller genutzten Fragen
  const [selectedCompareCard, setSelectedCompareCard] = useState(null);

  // Funktion um Vergleichsfrage-Button zu verwenden
  const useCompareOption = (option) => {
    setSelectedCompareCard(
      `Ist dein nächster ${option.toUpperCase()} derselbe wie mein nächster ${option.toUpperCase()}?`
    );
    setUsedQuestions((prev) => {
      if (!prev.includes(option)) {
        return [...prev, option];
      }
      return prev;
    });
  };

  // Hilfsfunktion ob Button deaktiviert sein soll
  const isOptionUsed = (option) => usedQuestions.includes(option);

  // Reset Funktion, die alle gespeicherten genutzten Fragen löscht
  const resetUsedQuestions = () => {
    setUsedQuestions([]);
    setSelectedCompareCard(null);
    alert("Alle gespeicherten Fragen wurden zurückgesetzt.");
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center min-h-screen flex flex-col">
      {view === "menu" && (
        <>
          <h1 className="text-3xl font-bold mb-6">Seeker Hauptmenü</h1>
          <button
            onClick={() => setView("fragen")}
            className="mb-4 w-full rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
          >
            Fragen
          </button>
          <button
            onClick={() => setView("notizen")}
            className="mb-4 w-full rounded bg-gray-600 px-4 py-3 text-white hover:bg-gray-700"
          >
            Notizen (bald)
          </button>
        </>
      )}

      {view === "fragen" && (
        <>
          <button
            onClick={() => setView("menu")}
            className="mb-6 self-start rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            &larr; Zurück zur Auswahl
          </button>

          <h2 className="mb-4 text-xl font-semibold">Fragen-Kategorien</h2>

          <button
            onClick={() => setView("vergleiche")}
            className="mb-2 w-full rounded bg-green-600 px-4 py-3 text-white hover:bg-green-700"
          >
            Vergleiche
          </button>

          {/* Weitere Kategorien vorerst deaktiviert */}
          <button
            onClick={() => alert("Noch nicht implementiert")}
            disabled
            className="mb-2 w-full cursor-not-allowed rounded bg-gray-400 px-4 py-3 text-white opacity-70"
          >
            Präzisionsfrage
          </button>

          <button
            onClick={() => alert("Noch nicht implementiert")}
            disabled
            className="mb-2 w-full cursor-not-allowed rounded bg-gray-400 px-4 py-3 text-white opacity-70"
          >
            Fotos
          </button>

          <button
            onClick={() => alert("Noch nicht implementiert")}
            disabled
            className="mb-2 w-full cursor-not-allowed rounded bg-gray-400 px-4 py-3 text-white opacity-70"
          >
            Maße
          </button>

          <button
            onClick={() => alert("Noch nicht implementiert")}
            disabled
            className="mb-2 w-full cursor-not-allowed rounded bg-gray-400 px-4 py-3 text-white opacity-70"
          >
            Thermometer
          </button>

          <button
            onClick={() => alert("Noch nicht implementiert")}
            disabled
            className="mb-2 w-full cursor-not-allowed rounded bg-gray-400 px-4 py-3 text-white opacity-70"
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
            }}
            className="mb-4 self-start rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            &larr; Zurück zu Fragen
          </button>

          <h2 className="mb-2 text-xl font-semibold">Vergleiche</h2>
          <p className="mb-1 font-semibold">
            Preis: Der Verstecker darf 2 Karten ziehen
          </p>
          <p className="mb-6 italic">
            Beispiel: Ist dein nächster ___ derselbe wie mein nächster ___?
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {compareOptions.map((option) => (
              <button
                key={option}
                onClick={() => useCompareOption(option)}
                disabled={isOptionUsed(option)}
                className={`rounded border px-3 py-2 text-center text-sm font-medium
                ${
                  isOptionUsed(option)
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedCompareCard && (
            <div className="mx-auto max-w-xl rounded border bg-white p-4 text-lg font-bold shadow">
              {selectedCompareCard}
            </div>
          )}
        </>
      )}

      {view === "notizen" && (
        <>
          <button
            onClick={() => setView("menu")}
            className="mb-6 self-start rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            &larr; Zurück zur Auswahl
          </button>

          <h2 className="mb-4 text-xl font-semibold">Notizen</h2>
          <p className="mb-6 italic text-gray-600">
            Notizen werden noch implementiert.
          </p>

          {/* Reset Button nur hier */}
          <button
            onClick={resetUsedQuestions}
            className="rounded bg-red-600 px-6 py-3 text-white hover:bg-red-700"
          >
            Alle gespeicherten Fragen zurücksetzen
          </button>
        </>
      )}
    </div>
  );
}
