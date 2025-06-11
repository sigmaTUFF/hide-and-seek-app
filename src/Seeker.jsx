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

const measureOptions = [
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

const thermometerDistances = ["100m", "200m", "300m", "500m", "1km"];

export default function Seeker() {
  const [view, setView] = useState("menu"); // menu, fragen, notizen, vergleiche, praezision, fotos, masse, thermometer

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

  // States Fotos (neu)
  const [usedPhotoOptions, setUsedPhotoOptions] = useState(() => {
    return JSON.parse(localStorage.getItem("usedPhotoOptions")) || [];
  });
  const [selectedPhotoCard, setSelectedPhotoCard] = useState(null);
  const [pendingPhotoOption, setPendingPhotoOption] = useState(null); // Für Bestätigung

  // States Maße (neu)
  const [usedMeasureOptions, setUsedMeasureOptions] = useState(() => {
    return JSON.parse(localStorage.getItem("usedMeasureOptions")) || [];
  });
  const [selectedMeasureCard, setSelectedMeasureCard] = useState(null);
  const [pendingMeasureOption, setPendingMeasureOption] = useState(null); // Für Bestätigung
  const [distanceInputMeasure, setDistanceInputMeasure] = useState("");

  // States Thermometer (neu)
  const [pendingThermometerDistance, setPendingThermometerDistance] = useState(null);
  const [distanceInput, setDistanceInput] = useState("");
  const [selectedThermometerCard, setSelectedThermometerCard] = useState(null);
  const [temperatureAnswer, setTemperatureAnswer] = useState(null);

  // Reset Bestätigung
  const [resetConfirm, setResetConfirm] = useState(false);

  // Speicherung in localStorage bei Änderungen
  useEffect(() => {
    localStorage.setItem("usedCompareOptions", JSON.stringify(usedCompareOptions));
  }, [usedCompareOptions]);

  useEffect(() => {
    localStorage.setItem("usedPrecisionWords", JSON.stringify(usedPrecisionWords));
  }, [usedPrecisionWords]);

  useEffect(() => {
    localStorage.setItem("usedPhotoOptions", JSON.stringify(usedPhotoOptions));
  }, [usedPhotoOptions]);

  useEffect(() => {
    localStorage.setItem("usedMeasureOptions", JSON.stringify(usedMeasureOptions));
  }, [usedMeasureOptions]);

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

  // Fotos "benutzen" mit Bestätigung
  const requestUsePhotoOption = (option) => {
    setPendingPhotoOption(option);
  };

  const confirmUsePhotoOption = () => {
    if (!pendingPhotoOption) return;
    setSelectedPhotoCard(
      `Schick mir ein Foto von ${pendingPhotoOption.toUpperCase()}, das du von deinem Standort aus erkennen kannst.`
    );
    setUsedPhotoOptions((prev) => [...prev, pendingPhotoOption]);
    setPendingPhotoOption(null);
  };

  const cancelUsePhotoOption = () => {
    setPendingPhotoOption(null);
  };

  // Maße "benutzen" mit Bestätigung
  const requestUseMeasureOption = (option) => {
    setPendingMeasureOption(option);
  };

  const confirmUseMeasureOption = () => {
    if (!pendingMeasureOption) return;
    if (!distanceInputMeasure || isNaN(Number(distanceInputMeasure))) {
      alert("Bitte gib eine gültige Zahl für die Entfernung ein.");
      return;
    }
    setSelectedMeasureCard(
      `Bist du näher an ${pendingMeasureOption.toUpperCase()} als ich? (meine Entfernung = ${distanceInputMeasure} m)`
    );
    setUsedMeasureOptions((prev) => [...prev, pendingMeasureOption]);
    setPendingMeasureOption(null);
    setDistanceInputMeasure("");
  };

  const cancelUseMeasureOption = () => {
    setPendingMeasureOption(null);
    setDistanceInputMeasure("");
  };

  // Thermometer Aktionen
  const cancelThermometer = () => {
    setPendingThermometerDistance(null);
    setDistanceInput("");
    setSelectedThermometerCard(null);
    setTemperatureAnswer(null);
  };

  // Reset aller verwendeten Karten mit Bestätigung
  const startReset = () => {
    setResetConfirm(true);
  };

  const confirmReset = () => {
    setUsedCompareOptions([]);
    setUsedPrecisionWords([]);
    setUsedPhotoOptions([]);
    setUsedMeasureOptions([]);
    setSelectedCompareCard(null);
    setSelectedPrecisionCard(null);
    setSelectedPhotoCard(null);
    setSelectedMeasureCard(null);
    setSelectedThermometerCard(null);
    setPendingCompareOption(null);
    setPendingPrecisionWord(null);
    setPendingPhotoOption(null);
    setPendingMeasureOption(null);
    setPendingThermometerDistance(null);
    setDistanceInput("");
    setDistanceInputMeasure("");
    setTemperatureAnswer(null);
    setResetConfirm(false);
  };

  const cancelReset = () => {
    setResetConfirm(false);
  };

  // Hilfsfunktionen deaktivieren Buttons
  const isCompareUsed = (option) => usedCompareOptions.includes(option);
  const isPrecisionWordUsed = (word) => usedPrecisionWords.includes(word);
  const isPhotoUsed = (option) => usedPhotoOptions.includes(option);
  const isMeasureUsed = (option) => usedMeasureOptions.includes(option);

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
            onClick={() => setView("fotos")}
            className="btn p-3 mb-2 w-full bg-green-600 text-white rounded hover:bg-green-700"
          >
            Fotos
          </button>

          <button
            onClick={() => setView("masse")}
            className="btn p-3 mb-2 w-full bg-green-600 text-white rounded hover:bg-green-700"
          >
            Maße
          </button>

          <button
            onClick={() => setView("thermometer")}
            className="btn p-3 mb-2 w-full bg-green-600 text-white rounded hover:bg-green-700"
          >
            Thermometer
          </button>
        </>
      )}

      {/* Vergleiche */}
      {view === "vergleiche" && (
        <>
          <button
            onClick={() => setView("fragen")}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zu Fragen
          </button>

          <h2 className="text-xl font-semibold mb-4">Vergleiche</h2>
          <p className="mb-2 font-semibold">Preis: Der Verstecker darf 1 Karte ziehen</p>

          <div className="grid gap-2 max-w-xl mx-auto">
            {compareOptions.map((option) => (
              <button
                key={option}
                onClick={() => requestUseCompareOption(option)}
                disabled={isCompareUsed(option)}
                className={`p-2 rounded text-white ${
                  isCompareUsed(option)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Nächster {option}
              </button>
            ))}
          </div>

          {/* Bestätigung */}
          {pendingCompareOption && (
            <div className="mt-4 border p-3 bg-yellow-100 rounded max-w-xl mx-auto text-left">
              <p className="mb-2 font-semibold">Frage bestätigen:</p>
              <p className="mb-4">
                Ist dein nächster <strong>{pendingCompareOption}</strong> derselbe wie mein nächster{" "}
                <strong>{pendingCompareOption}</strong>?
              </p>
              <button
                onClick={confirmUseCompareOption}
                className="btn p-2 bg-green-600 text-white rounded hover:bg-green-700 mr-2"
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

          {/* Ausgewählte Karte anzeigen */}
          {selectedCompareCard && (
            <div className="mt-4 border rounded p-4 bg-white shadow max-w-xl mx-auto font-bold text-lg">
              {selectedCompareCard}
            </div>
          )}
        </>
      )}

      {/* Präzisionsfrage */}
      {view === "praezision" && (
        <>
          <button
            onClick={() => setView("fragen")}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zu Fragen
          </button>

          <h2 className="text-xl font-semibold mb-2">Präzisionsfrage</h2>
          <p className="mb-1 font-semibold">Preis: Der Verstecker darf 2 Karten ziehen</p>
          <p className="mb-4 italic">Von allen ___ in ___ Umkreis: welchem bist du am nächsten?</p>

          <div className="mb-4">
            <label htmlFor="praezision-range" className="mr-2 font-semibold">
              Umkreis wählen:
            </label>
            <select
              id="praezision-range"
              value={selectedPrecisionRange}
              onChange={(e) => setSelectedPrecisionRange(e.target.value)}
              className="p-1 border rounded"
            >
              {precisionRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2 max-w-xl mx-auto">
            {usedPrecisionWords.length === precisionRanges.length && (
              <p className="mb-2 font-semibold text-red-600">Alle Präzisionswörter wurden bereits verwendet.</p>
            )}
            {precisionRanges.length > 0 &&
              ["Spielplatz", "Bahnhof", "Bushaltestelle", "Sportplatz", "Museum", "Rathaus", "Kirche", "Apotheke", "Restaurant", "Lebensmittelladen", "Arztpraxis", "Schule", "Kindergarten", "See"]
                .filter((word) => !isPrecisionWordUsed(word))
                .map((word) => (
                  <button
                    key={word}
                    onClick={() => requestUsePrecisionWord(word)}
                    className="p-2 rounded bg-green-500 text-white hover:bg-green-600"
                  >
                    {word}
                  </button>
                ))}
          </div>

          {/* Bestätigung */}
          {pendingPrecisionWord && (
            <div className="mt-4 border p-3 bg-yellow-100 rounded max-w-xl mx-auto text-left">
              <p className="mb-2 font-semibold">Frage bestätigen:</p>
              <p className="mb-4">
                Von allen <strong>{pendingPrecisionWord}</strong> in{" "}
                <strong>{selectedPrecisionRange}</strong> Umkreis: welchem bist du am nächsten?
              </p>
              <button
                onClick={confirmUsePrecisionWord}
                className="btn p-2 bg-green-600 text-white rounded hover:bg-green-700 mr-2"
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

          {/* Ausgewählte Karte anzeigen */}
          {selectedPrecisionCard && (
            <div className="mt-4 border rounded p-4 bg-white shadow max-w-xl mx-auto font-bold text-lg">
              {selectedPrecisionCard}
            </div>
          )}
        </>
      )}

      {/* Fotos */}
      {view === "fotos" && (
        <>
          <button
            onClick={() => setView("fragen")}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zu Fragen
          </button>

          <h2 className="text-xl font-semibold mb-2">Fotos</h2>
          <p className="mb-1 font-semibold">Preis: Der Verstecker darf 1 Karte ziehen</p>
          <p className="mb-4 italic">Schick mir ein Foto von ___, das du von deinem Standort aus erkennen kannst</p>

          <div className="grid gap-2 max-w-xl mx-auto">
            {["dem nächsten Baum (ganzer Baum)", "Himmel", "dir", "der größten Struktur", "dem nächsten Gebäude", "der nächsten Straße"]
              .filter((option) => !isPhotoUsed(option))
              .map((option) => (
                <button
                  key={option}
                  onClick={() => requestUsePhotoOption(option)}
                  className="p-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  {option}
                </button>
              ))}
          </div>

          {/* Bestätigung */}
          {pendingPhotoOption && (
            <div className="mt-4 border p-3 bg-yellow-100 rounded max-w-xl mx-auto text-left">
              <p className="mb-2 font-semibold">Frage bestätigen:</p>
              <p className="mb-4">
                Schick mir ein Foto von <strong>{pendingPhotoOption}</strong>, das du von deinem Standort aus erkennen kannst.
              </p>
              <button
                onClick={confirmUsePhotoOption}
                className="btn p-2 bg-green-600 text-white rounded hover:bg-green-700 mr-2"
              >
                Bestätigen
              </button>
              <button
                onClick={cancelUsePhotoOption}
                className="btn p-2 bg-gray-400 rounded hover:bg-gray-500"
              >
                Abbrechen
              </button>
            </div>
          )}

          {/* Ausgewählte Karte anzeigen */}
          {selectedPhotoCard && (
            <div className="mt-4 border rounded p-4 bg-white shadow max-w-xl mx-auto font-bold text-lg">
              {selectedPhotoCard}
            </div>
          )}
        </>
      )}

      {/* Maße */}
      {view === "masse" && (
        <>
          <button
            onClick={() => setView("fragen")}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zu Fragen
          </button>

          <h2 className="text-xl font-semibold mb-2">Maße</h2>
          <p className="mb-1 font-semibold">Preis: Der Verstecker darf 2 Karten ziehen</p>

          <p className="mb-4 italic">
            Bist du näher an ___ als ich? (meine Entfernung = Eingabefeld)
          </p>

          <div className="grid gap-2 max-w-xl mx-auto">
            {[
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
            ]
              .filter((option) => !isMeasureUsed(option))
              .map((option) => (
                <button
                  key={option}
                  onClick={() => requestUseMeasureOption(option)}
                  className="p-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  {option}
                </button>
              ))}
          </div>

          {/* Eingabefeld + Bestätigung */}
          {pendingMeasureOption && (
            <div className="mt-4 border p-3 bg-yellow-100 rounded max-w-xl mx-auto text-left">
              <p className="mb-2 font-semibold">Entfernung des Versteckers eingeben (in Metern):</p>
              <input
                type="text"
                value={distanceInputMeasure}
                onChange={(e) => setDistanceInputMeasure(e.target.value)}
                placeholder="z.B. 250"
                className="border p-1 rounded w-24 mb-4"
              />
              <p className="mb-4 font-bold">
                Bist du näher an <strong>{pendingMeasureOption}</strong> als ich? (meine Entfernung = {distanceInputMeasure} m)
              </p>
              <div className="flex gap-4">
                <button
                  onClick={confirmUseMeasureOption}
                  className="btn p-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Bestätigen
                </button>
                <button
                  onClick={cancelUseMeasureOption}
                  className="btn p-2 bg-gray-400 rounded hover:bg-gray-500"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          )}

          {/* Ausgewählte Karte anzeigen */}
          {selectedMeasureCard && (
            <div className="mt-4 border rounded p-4 bg-white shadow max-w-xl mx-auto font-bold text-lg">
              {selectedMeasureCard}
            </div>
          )}
        </>
      )}

      {/* Thermometer */}
      {view === "thermometer" && (
        <>
          <button
            onClick={() => {
              setView("fragen");
              setSelectedThermometerCard(null);
              setPendingThermometerDistance(null);
              setDistanceInput("");
              setTemperatureAnswer(null);
            }}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zu Fragen
          </button>

          <h2 className="text-xl font-semibold mb-2">Thermometer</h2>
          <p className="mb-1 font-semibold">Preis: Der Verstecker darf 1 Karte ziehen</p>
          <p className="mb-4 italic">
            Ich bin ___ m gelaufen. Bin ich jetzt näher (wärmer) oder weiter weg (kälter)?
          </p>

          <div className="grid grid-cols-3 gap-2 max-w-xl mx-auto mb-4">
            {thermometerDistances.map((distance) => (
              <button
                key={distance}
                onClick={() => setPendingThermometerDistance(distance)}
                disabled={pendingThermometerDistance !== null}
                className={`p-2 rounded border ${
                  pendingThermometerDistance === distance
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {distance}
              </button>
            ))}
          </div>

          {/* Eingabefeld zur gelaufenen Strecke */}
          {pendingThermometerDistance && (
            <div className="mb-4 p-3 border rounded bg-yellow-100 max-w-xl mx-auto text-left">
              <p className="mb-2 font-semibold">Bestätige die Frage mit deiner gelaufenen Strecke:</p>
              <p className="mb-2 font-bold">
                Ich bin{" "}
                <input
                  type="text"
                  value={distanceInput}
                  onChange={(e) => setDistanceInput(e.target.value)}
                  placeholder="z.B. 250"
                  className="border p-1 rounded w-20 mx-1"
                />{" "}
                m gelaufen. Bin ich jetzt näher (wärmer) oder weiter weg (kälter)?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setTemperatureAnswer("wärmer")}
                  className="btn p-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Wärmer
                </button>
                <button
                  onClick={() => setTemperatureAnswer("kälter")}
                  className="btn p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Kälter
                </button>
                <button
                  onClick={cancelThermometer}
                  className="btn p-2 bg-gray-400 rounded hover:bg-gray-500"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          )}

          {/* Ergebnis */}
          {temperatureAnswer && (
            <div className="mt-4 border rounded p-4 bg-white shadow max-w-xl mx-auto font-bold text-lg">
              Du hast geantwortet: <strong>{temperatureAnswer}</strong> bei {distanceInput} m gelaufen.
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Fragen;

