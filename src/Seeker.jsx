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

const precisionRanges = ["500m", "1km", "2km", "3km"];

export default function Seeker() {
  const [view, setView] = useState("menu"); // menu, fragen, notizen, vergleiche, praezision

  // States Vergleichskategorie
  const [usedCompareOptions, setUsedCompareOptions] = useState(() => {
    return JSON.parse(localStorage.getItem("usedCompareOptions")) || [];
  });
  const [selectedCompareCard, setSelectedCompareCard] = useState(null);
  const [pendingCompareOption, setPendingCompareOption] = useState(null); // Für Bestätigung

  // States Präzisionskategorie
  const [usedPrecisionWords, setUsedPrecisionWords] = useState(() => {
    return JSON.parse(localStorage.getItem("usedPrecisionWords")) || [];
  });
  const [selectedPrecisionCard, setSelectedPrecisionCard] = useState(null);
  const [pendingPrecisionWord, setPendingPrecisionWord] = useState(null); // Für Bestätigung
  const [selectedPrecisionRange, setSelectedPrecisionRange] = useState(precisionRanges[0]);

  // Reset Bestätigung
  const [resetConfirm, setResetConfirm] = useState(false);

  // Speicherung in localStorage bei Änderungen
  useEffect(() => {
    localStorage.setItem("usedCompareOptions", JSON.stringify(usedCompareOptions));
  }, [usedCompareOptions]);

  useEffect(() => {
    localStorage.setItem("usedPrecisionWords", JSON.stringify(usedPrecisionWords));
  }, [usedPrecisionWords]);

  // Vergleichsoption "benutzen" mit Bestätigung
  const requestUseCompareOption = (option) => {
    setPendingCompareOption(option);
  };

  const confirmUseCompareOption = () => {
    if (!pendingCompareOption) return;
    setSelectedCompareCard(
      `Ist dein nächster ${pendingCompareOption.toUpperCase()} derselbe wie mein nächster ${pendingCompareOption.toUpperCase()}?`
    );
    setUsedCompareOptions((prev) => [...prev, pendingCompareOption]);
    setPendingCompareOption(null);
  };

  const cancelUseCompareOption = () => {
    setPendingCompareOption(null);
  };

  // Präzisionswort "benutzen" mit Bestätigung
  const requestUsePrecisionWord = (word) => {
    setPendingPrecisionWord(word);
  };

  const confirmUsePrecisionWord = () => {
    if (!pendingPrecisionWord) return;
    setSelectedPrecisionCard(
      `Von allen ${pendingPrecisionWord.toUpperCase()} in ${selectedPrecisionRange} Umkreis: welchem bist du am nächsten?`
    );
    setUsedPrecisionWords((prev) => [...prev, pendingPrecisionWord]);
    setPendingPrecisionWord(null);
  };

  const cancelUsePrecisionWord = () => {
    setPendingPrecisionWord(null);
  };

  // Reset aller verwendeten Karten mit Bestätigung
  const startReset = () => {
    setResetConfirm(true);
  };

  const confirmReset = () => {
    setUsedCompareOptions([]);
    setUsedPrecisionWords([]);
    setSelectedCompareCard(null);
    setSelectedPrecisionCard(null);
    setPendingCompareOption(null);
    setPendingPrecisionWord(null);
    setResetConfirm(false);
  };

  const cancelReset = () => {
    setResetConfirm(false);
  };

  // Hilfsfunktionen deaktivieren Buttons
  const isCompareUsed = (option) => usedCompareOptions.includes(option);
  const isPrecisionWordUsed = (word) => usedPrecisionWords.includes(word);

  return (
    <div className="max-w-md mx-auto p-4 text-center min-h-screen flex flex-col">
      {/* Hauptmenü */}
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
            onClick={startReset}
            className="btn p-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reset alle verwendeten Karten
          </button>

          {resetConfirm && (
            <div className="mt-4 border p-3 bg-yellow-100 rounded">
              <p className="mb-2 font-semibold">Willst du wirklich alle verwendeten Karten zurücksetzen?</p>
              <button
                onClick={confirmReset}
                className="btn p-2 mr-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Ja, zurücksetzen
              </button>
              <button
                onClick={cancelReset}
                className="btn p-2 bg-gray-400 rounded hover:bg-gray-500"
              >
                Nein, abbrechen
              </button>
            </div>
          )}
        </>
      )}

      {/* Fragen Auswahl */}
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

      {/* Vergleiche */}
      {view === "vergleiche" && (
        <>
          <button
            onClick={() => {
              setView("fragen");
              setSelectedCompareCard(null);
              setPendingCompareOption(null);
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
                onClick={() => requestUseCompareOption(option)}
                disabled={isCompareUsed(option) || pendingCompareOption !== null}
                className={`p-2 rounded border ${
                  isCompareUsed(option)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : pendingCompareOption !== null
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Bestätigung für Vergleiche */}
          {pendingCompareOption && (
            <div className="mb-4 p-3 border rounded bg-yellow-100 max-w-xl mx-auto">
              <p className="mb-2 font-semibold">Bestätige die Verwendung der Frage:</p>
              <p className="mb-4 font-bold">
                Ist dein nächster {pendingCompareOption.toUpperCase()} derselbe wie mein nächster {pendingCompareOption.toUpperCase()}?
              </p>
              <button
                onClick={confirmUseCompareOption}
                className="btn p-2 mr-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Bestätigen
              </button>
              <button
                onClick={cancelUseCompareOption}
                className="btn p-2 bg-gray-400 rounded hover:bg-gray-500"
              >
                Abbrechen
              </button>
            </div>
          )}

          {selectedCompareCard && (
            <div className="border rounded p-4 bg-white shadow text-lg font-bold max-w-xl mx-auto">
              {selectedCompareCard}
            </div>
          )}
        </>
      )}

      {/* Präzisionsfrage */}
      {view === "praezision" && (
        <>
          <button
            onClick={() => {
              setView("fragen");
              setSelectedPrecisionCard(null);
              setPendingPrecisionWord(null);
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
                  disabled={pendingPrecisionWord !== null}
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
                onClick={() => requestUsePrecisionWord(option)}
                disabled={isPrecisionWordUsed(option) || pendingPrecisionWord !== null}
                className={`p-2 rounded border ${
                  isPrecisionWordUsed(option)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : pendingPrecisionWord !== null
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Bestätigung für Präzision */}
          {pendingPrecisionWord && (
            <div className="mb-4 p-3 border rounded bg-yellow-100 max-w-xl mx-auto">
              <p className="mb-2 font-semibold">Bestätige die Verwendung der Frage:</p>
              <p className="mb-4 font-bold">
                Von allen {pendingPrecisionWord.toUpperCase()} in {selectedPrecisionRange} Umkreis: welchem bist du am nächsten?
              </p>
              <button
                onClick={confirmUsePrecisionWord}
                className="btn p-2 mr-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Bestätigen
              </button>
              <button
                onClick={cancelUsePrecisionWord}
                className="btn p-2 bg-gray-400 rounded hover:bg-gray-500"
              >
                Abbrechen
              </button>
            </div>
          )}

          {selectedPrecisionCard && (
            <div className="border rounded p-4 bg-white shadow text-lg font-bold max-w-xl mx-auto">
              {selectedPrecisionCard}
            </div>
          )}
        </>
      )}

      {/* Notizen */}
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
