import { useState, useEffect } from "react";

const categories = {
  Vergleiche: {
    preis: "Der Verstecker darf 2 Karten ziehen",
    beispiel: "Ist dein nächster ___ derselbe wie mein nächster ___",
    optionen: [
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
    ],
  },
  // Andere Kategorien kannst du später ergänzen
};

export default function Seeker() {
  // View kann "menu", "fragen", "notizen", "vergleiche" etc. sein
  const [view, setView] = useState("menu");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState(() => {
    // Aus localStorage lesen (persistente Speicherung)
    const saved = localStorage.getItem("usedQuestions");
    return saved ? JSON.parse(saved) : [];
  });
  const [displayedQuestion, setDisplayedQuestion] = useState(null);

  // Speichern wenn usedQuestions sich ändert
  useEffect(() => {
    localStorage.setItem("usedQuestions", JSON.stringify(usedQuestions));
  }, [usedQuestions]);

  // Reset-Funktion für Notizen (löscht alle gespeicherten benutzten Fragen)
  const resetUsedQuestions = () => {
    setUsedQuestions([]);
    localStorage.removeItem("usedQuestions");
  };

  // Klick auf eine Frage-Option
  const handleQuestionClick = (option) => {
    if (usedQuestions.includes(option)) return; // Verhindert nochmalige Nutzung
    setDisplayedQuestion(
      `Ist dein nächster ${option.toUpperCase()} derselbe wie mein nächster ${option.toUpperCase()}`
    );
    setUsedQuestions((prev) => [...prev, option]);
  };

  // UI für die Kategorie Vergleiche
  const renderVergleiche = () => {
    const cat = categories.Vergleiche;
    return (
      <div>
        <button
          className="btn bg-gray-300 mb-4"
          onClick={() => {
            setSelectedCategory(null);
            setView("fragen");
            setDisplayedQuestion(null);
          }}
        >
          Zurück zu Kategorien
        </button>
        <h2 className="font-bold mb-2">Preis: {cat.preis}</h2>
        <p className="italic mb-4">Beispiel: {cat.beispiel}</p>

        <div className="flex flex-wrap gap-2">
          {cat.optionen.map((option) => (
            <button
              key={option}
              disabled={usedQuestions.includes(option)}
              onClick={() => handleQuestionClick(option)}
              className={`btn p-2 rounded ${
                usedQuestions.includes(option)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {displayedQuestion && (
          <div className="mt-6 p-4 border rounded bg-white shadow max-w-xl mx-auto">
            <h3 className="font-semibold mb-2">Verwendete Frage:</h3>
            <p>{displayedQuestion}</p>
            <button
              onClick={() => setDisplayedQuestion(null)}
              className="mt-4 px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
            >
              Schließen
            </button>
          </div>
        )}
      </div>
    );
  };

  // Hauptmenu mit Fragen/Notizen Auswahl und Reset Button unter Notizen
  const renderMenu = () => (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-xl font-bold mb-4">Seeker Startseite</h1>
      <button
        className="btn p-3 bg-blue-600 text-white rounded hover:bg-blue-700 w-48"
        onClick={() => setView("fragen")}
      >
        Fragen
      </button>
      <button
        className="btn p-3 bg-green-600 text-white rounded hover:bg-green-700 w-48"
        onClick={() => setView("notizen")}
      >
        Notizen
      </button>

      {view === "notizen" && (
        <div className="mt-6">
          <button
            className="btn p-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={resetUsedQuestions}
          >
            Benutzte Fragen zurücksetzen
          </button>
        </div>
      )}
    </div>
  );

  // Fragen-Auswahl Menü
  const renderFragenMenu = () => (
    <div>
      <button
        className="btn bg-gray-300 mb-4"
        onClick={() => setView("menu")}
      >
        Zurück zur Auswahl (Fragen / Notizen)
      </button>
      <h2 className="font-bold mb-4">Fragen Kategorien</h2>
      <div className="flex flex-col gap-2 max-w-xs mx-auto">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            className="btn p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              setSelectedCategory(cat);
              setView(cat.toLowerCase());
              setDisplayedQuestion(null);
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-4 text-center min-h-screen flex flex-col">
      {view === "menu" && renderMenu()}
      {view === "fragen" && renderFragenMenu()}
      {selectedCategory === "Vergleiche" && view === "vergleiche" && renderVergleiche()}
      {/* Später hier weitere Kategorien hinzufügen */}
    </div>
  );
}
