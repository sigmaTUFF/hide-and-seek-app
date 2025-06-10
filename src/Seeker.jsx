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

const precisionRanges = ["500m", "1km", "2km", "3km"];

export default function Seeker() {
  const [view, setView] = useState("menu"); // menu, fragen, notizen, vergleiche, praezision
  const [usedCompareOptions, setUsedCompareOptions] = useState([]);
  const [usedPrecisionWords, setUsedPrecisionWords] = useState([]);
  const [selectedCompareCard, setSelectedCompareCard] = useState(null);
  const [selectedPrecisionCard, setSelectedPrecisionCard] = useState(null);
  const [selectedPrecisionRange, setSelectedPrecisionRange] = useState(precisionRanges[0]);

  // Vergleichsfrage verwenden
  const useCompareOption = (option) => {
    setSelectedCompareCard(
      `Ist dein nächster ${option.toUpperCase()} derselbe wie mein nächster ${option.toUpperCase()}?`
    );
    setUsedCompareOptions((prev) => [...prev, option]);
  };

  // Präzisionsfrage Wort verwenden
  const usePrecisionWord = (word) => {
    setSelectedPrecisionCard(
      `Von allen ${word.toUpperCase()} in ${selectedPrecisionRange} Umkreis: welchem bist du am nächsten?`
    );
    setUsedPrecisionWords((prev) => [...prev, word]);
  };

  // Hilfsfunktionen
  const isCompareUsed = (option) => usedCompareOptions.includes(option);
  const isPrecisionWordUsed = (word) => usedPrecisionWords.includes(word);

  // Reset alle verwendeten Karten
  const resetUsed = () => {
    setUsedCompareOptions([]);
    setUsedPrecisionWords([]);
    setSelectedCompareCard(null);
    setSelectedPrecisionCard(null);
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
            className="btn p-2 mb-4 bg-gray-400 text-white rounded cursor-not-allowed"
            disabled
            title="Notizen werden aktuell nicht unterstützt"
          >
            Notizen (bald)
          </button>
          <button
            onClick={resetUsed}
            className="btn p-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reset alle verwendeten Karten
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
            onClick={() => setView("praezision")}
            className="btn p-3 mb-2 w-full bg-green-600 text-white rounded hover:bg-green-700"
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

      {/* Vergleiche Kategorie */}
      {view === "vergleiche" && (
        <>
          <button
            onClick={() => {
              setView("fragen");
              setSelectedCompareCard(null);
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
                disabled={isCompareUsed(option)}
                className={`p-2 rounded border ${
                  isCompareUsed(option)
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

      {/* Präzisionsfrage Kategorie */}
      {view === "praezision" && (
        <>
          <button
            onClick={() => {
              setView("fragen");
              setSelectedPrecisionCard(null);
            }}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zu Fragen
          </button>

          <h2 className="text-xl font-semibold mb-2">Präzisionsfrage</h2>
          <p className="mb-1 font-semibold">Preis: Der Verstecker darf 3 Karten ziehen</p>
          <p className="mb-4 italic">Beispiel: Von allen ___ in 1km Umkreis: welchem bist du am nächsten?</p>

          <div className="mb-4">
            <p className="font-semibold mb-2">Wähle den Umkreis:</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {precisionRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedPrecisionRange(range)}
                  className={`p-2 rounded border ${
                    selectedPrecisionRange === range
                      ? "bg-green-700 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {compareOptions.map((option) => (
              <button
                key={option}
                onClick={() => usePrecisionWord(option)}
                disabled={isPrecisionWordUsed(option)}
                className={`p-2 rounded border ${
                  isPrecisionWordUsed(option)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedPrecisionCard && (
            <div className="border rounded p-4 bg-white shadow text-lg font-bold max-w-xl mx-auto">
              {selectedPrecisionCard}
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
        </div>
      )}
    </div>
  );
}
