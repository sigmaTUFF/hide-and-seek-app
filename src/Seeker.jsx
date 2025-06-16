import { useState, useEffect } from "react";

// Optionen für die verschiedenen Kategorien
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

const photoPrompts = [
  "dem nächsten Baum (ganzer Baum)",
  "dem Himmel",
  "dir",
  "der größten Struktur",
  "dem nächsten Gebäude",
  "der nächsten Straße",
];

const masseOptions = [
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

// Neue Thermometer-Distanzen
const thermometerDistances = [
  "100m",
  "200m",
  "300m",
  "500m",
  "750m",
  "1km",
];

// Thermometer-Komponente
function Thermometer({ disabled, savedData, onSave }) {
  const [selectedDistance, setSelectedDistance] = useState(savedData?.distance || "");
  const [isConfirmed, setIsConfirmed] = useState(savedData?.confirmed || false);

  useEffect(() => {
    onSave({
      distance: selectedDistance,
      confirmed: isConfirmed,
    });
  }, [selectedDistance, isConfirmed]);

  return (
    <fieldset disabled={disabled} style={{ opacity: disabled ? 0.5 : 1 }}>
      <legend><strong>Thermometer</strong></legend>

      <p><strong>Preis:</strong> Der Verstecker darf 1 Karte ziehen</p>
      <p><strong>Frage:</strong> Ich bin ___ m gelaufen. Bin ich jetzt näher (wärmer) oder weiter weg (kälter)?</p>

      <div>
        {thermometerDistances.map((dist) => (
          <label key={dist} style={{ display: "block", marginBottom: "6px" }}>
            <input
              type="radio"
              name="thermometer-distance"
              value={dist}
              checked={selectedDistance === dist}
              onChange={() => setSelectedDistance(dist)}
              disabled={disabled}
            />
            {dist}
          </label>
        ))}
      </div>

      <label style={{ display: "block", marginTop: "12px" }}>
        <input
          type="checkbox"
          checked={isConfirmed}
          onChange={() => setIsConfirmed(!isConfirmed)}
          disabled={disabled || !selectedDistance}
        />
        Bestätigung
      </label>
    </fieldset>
  );
}

export default function Seeker() {
  const [view, setView] = useState("menu"); // menu, fragen, notizen, vergleiche, praezision, fotos, masse, thermometer

  // Vergleichskategorie
  const [usedCompareOptions, setUsedCompareOptions] = useState(() => {
    return JSON.parse(localStorage.getItem("usedCompareOptions")) || [];
  });
  const [selectedCompareCard, setSelectedCompareCard] = useState(null);
  const [pendingCompareOption, setPendingCompareOption] = useState(null);

  // Präzision
  const [usedPrecisionWords, setUsedPrecisionWords] = useState(() => {
    return JSON.parse(localStorage.getItem("usedPrecisionWords")) || [];
  });
  const [selectedPrecisionCard, setSelectedPrecisionCard] = useState(null);
  const [pendingPrecisionWord, setPendingPrecisionWord] = useState(null);
  const [selectedPrecisionRange, setSelectedPrecisionRange] = useState(precisionRanges[0]);

  // Fotos
  const [usedPhotoPrompts, setUsedPhotoPrompts] = useState(() => {
    return JSON.parse(localStorage.getItem("usedPhotoPrompts")) || [];
  });
  const [selectedPhotoCard, setSelectedPhotoCard] = useState(null);
  const [pendingPhotoPrompt, setPendingPhotoPrompt] = useState(null);

  // Maße
  const [usedMasseOptions, setUsedMasseOptions] = useState(() => {
    return JSON.parse(localStorage.getItem("usedMasseOptions")) || [];
  });
  const [selectedMasseCard, setSelectedMasseCard] = useState(null);
  const [pendingMasseOption, setPendingMasseOption] = useState(null);
  const [distanceInput, setDistanceInput] = useState("");

  // Thermometer
  const [savedThermometerData, setSavedThermometerData] = useState(() => {
    return JSON.parse(localStorage.getItem("savedThermometerData")) || { distance: "", confirmed: false };
  });

  // Reset
  const [resetConfirm, setResetConfirm] = useState(false);

  // Speicher localStorage Updates
  useEffect(() => {
    localStorage.setItem("usedCompareOptions", JSON.stringify(usedCompareOptions));
  }, [usedCompareOptions]);

  useEffect(() => {
    localStorage.setItem("usedPrecisionWords", JSON.stringify(usedPrecisionWords));
  }, [usedPrecisionWords]);

  useEffect(() => {
    localStorage.setItem("usedPhotoPrompts", JSON.stringify(usedPhotoPrompts));
  }, [usedPhotoPrompts]);

  useEffect(() => {
    localStorage.setItem("usedMasseOptions", JSON.stringify(usedMasseOptions));
  }, [usedMasseOptions]);

  useEffect(() => {
    localStorage.setItem("savedThermometerData", JSON.stringify(savedThermometerData));
  }, [savedThermometerData]);

  // Vergleich Anfrage
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

  // Präzision Anfrage
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

  // Fotos Anfrage
  const requestUsePhotoPrompt = (prompt) => {
    setPendingPhotoPrompt(prompt);
  };

  const confirmUsePhotoPrompt = () => {
    if (!pendingPhotoPrompt) return;
    setSelectedPhotoCard(`Schick mir ein Foto von ${pendingPhotoPrompt}, das du von deinem Standort aus erkennen kannst.`);
    setUsedPhotoPrompts((prev) => [...prev, pendingPhotoPrompt]);
    setPendingPhotoPrompt(null);
  };

  const cancelUsePhotoPrompt = () => {
    setPendingPhotoPrompt(null);
  };

  // Maße Anfrage
  const requestUseMasseOption = (option) => {
    setPendingMasseOption(option);
    setDistanceInput("");
  };

  const confirmUseMasseOption = () => {
    if (!pendingMasseOption) return;
    if (!distanceInput.trim()) {
      alert("Bitte gib eine Entfernung ein!");
      return;
    }
    setSelectedMasseCard(
      `Bist du näher an ${pendingMasseOption.toUpperCase()} als ich? (meine Entfernung = ${distanceInput.trim()})`
    );
    setUsedMasseOptions((prev) => [...prev, pendingMasseOption]);
    setPendingMasseOption(null);
    setDistanceInput("");
  };

  const cancelUseMasseOption = () => {
    setPendingMasseOption(null);
    setDistanceInput("");
  };

  // Thermometer speichern
  const saveThermometerData = (data) => {
    setSavedThermometerData(data);
  };

  // Reset alle
  const startReset = () => {
    setResetConfirm(true);
  };

  const confirmReset = () => {
    setUsedCompareOptions([]);
    setUsedPrecisionWords([]);
    setUsedPhotoPrompts([]);
    setUsedMasseOptions([]);
    setSelectedCompareCard(null);
    setSelectedPrecisionCard(null);
    setSelectedPhotoCard(null);
    setSelectedMasseCard(null);
    setPendingCompareOption(null);
    setPendingPrecisionWord(null);
    setPendingPhotoPrompt(null);
    setPendingMasseOption(null);
    setDistanceInput("");
    setSavedThermometerData({ distance: "", confirmed: false });
    setResetConfirm(false);
  };

  const cancelReset = () => {
    setResetConfirm(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center min-h-screen flex flex-col">
      {/* Menü */}
      {view === "menu" && (
        <>
          <h1 className="text-3xl font-bold mb-6">Seeker</h1>

          <button
            onClick={() => setView("fragen")}
            className="btn p-3 mb-2 w-full bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Fragen
          </button>

          <button
            onClick={() => setView("vergleiche")}
            className="btn p-3 mb-2 w-full bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Vergleiche
          </button>

          <button
            onClick={() => setView("praezision")}
            className="btn p-3 mb-2 w-full bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            Präzision
          </button>

          <button
            onClick={() => setView("fotos")}
            className="btn p-3 mb-2 w-full bg-green-600 text-white rounded hover:bg-green-700"
          >
            Fotos
          </button>

          <button
            onClick={() => setView("masse")}
            className="btn p-3 mb-2 w-full bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Maße
          </button>

          <button
            onClick={() => setView("thermometer")}
            className="btn p-3 mb-2 w-full bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Thermometer
          </button>

          <button
            onClick={startReset}
            className="btn p-3 mt-6 w-full bg-red-600 text-white rounded hover:bg-red-700"
          >
            Alles zurücksetzen
          </button>

          {resetConfirm && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded">
              <p className="mb-2 font-semibold">Bist du sicher, dass du alles zurücksetzen möchtest?</p>
              <button
                onClick={confirmReset}
                className="btn p-2 mr-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Ja, alles zurücksetzen
              </button>
              <button
                onClick={cancelReset}
                className="btn p-2 bg-gray-400 rounded hover:bg-gray-500"
              >
                Abbrechen
              </button>
            </div>
          )}
        </>
      )}

      {/* Fragen */}
      {view === "fragen" && (
        <>
          <button
            onClick={() => setView("menu")}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zum Menü
          </button>

          <h2 className="text-xl font-semibold mb-4">Fragen</h2>

          {/* Hier könnte man deine Fragen-Optionen listen */}

          <p>... (Deine Fragen-Kategorie noch ausbauen) ...</p>
        </>
      )}

      {/* Vergleiche */}
      {view === "vergleiche" && (
        <>
          <button
            onClick={() => {
              setView("menu");
              setPendingCompareOption(null);
            }}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zum Menü
          </button>

          <h2 className="text-xl font-semibold mb-4">Vergleiche</h2>

          <div className="grid grid-cols-2 gap-2 mb-4 max-w-xl mx-auto">
            {compareOptions.map((option) => (
              <button
                key={option}
                onClick={() => requestUseCompareOption(option)}
                disabled={usedCompareOptions.includes(option) || pendingCompareOption !== null}
                className={`p-3 rounded border ${
                  usedCompareOptions.includes(option) || pendingCompareOption !== null
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Bestätigung */}
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

          {/* Anzeige nach Bestätigung */}
          {selectedCompareCard && (
            <div className="border rounded p-4 bg-white shadow text-lg font-bold max-w-xl mx-auto">
              {selectedCompareCard}
            </div>
          )}
        </>
      )}

      {/* Präzision */}
      {view === "praezision" && (
        <>
          <button
            onClick={() => {
              setView("menu");
              setPendingPrecisionWord(null);
            }}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zum Menü
          </button>

          <h2 className="text-xl font-semibold mb-4">Präzision</h2>

          <div className="mb-3">
            <label className="block mb-1 font-semibold" htmlFor="precision-range">
              Radius wählen:
            </label>
            <select
              id="precision-range"
              value={selectedPrecisionRange}
              onChange={(e) => setSelectedPrecisionRange(e.target.value)}
              className="p-2 rounded border border-gray-400"
            >
              {precisionRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4 max-w-xl mx-auto">
            {["Spielplatz", "Bahnhof", "Bushaltestelle", "Sportplatz", "Museum", "Rathaus", "Kirche", "Apotheke", "Restaurant", "Lebensmittelladen", "Arztpraxis", "Schule", "Kindergarten", "See"].map((word) => (
              <button
                key={word}
                onClick={() => requestUsePrecisionWord(word)}
                disabled={usedPrecisionWords.includes(word) || pendingPrecisionWord !== null}
                className={`p-3 rounded border ${
                  usedPrecisionWords.includes(word) || pendingPrecisionWord !== null
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-pink-600 text-white hover:bg-pink-700"
                }`}
              >
                {word}
              </button>
            ))}
          </div>

          {/* Bestätigung */}
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

          {/* Anzeige nach Bestätigung */}
          {selectedPrecisionCard && (
            <div className="border rounded p-4 bg-white shadow text-lg font-bold max-w-xl mx-auto">
              {selectedPrecisionCard}
            </div>
          )}
        </>
      )}

      {/* Fotos */}
      {view === "fotos" && (
        <>
          <button
            onClick={() => {
              setView("menu");
              setPendingPhotoPrompt(null);
            }}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zum Menü
          </button>

          <h2 className="text-xl font-semibold mb-4">Fotos</h2>

          <div className="grid grid-cols-2 gap-2 mb-4 max-w-xl mx-auto">
            {photoPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => requestUsePhotoPrompt(prompt)}
                disabled={usedPhotoPrompts.includes(prompt) || pendingPhotoPrompt !== null}
                className={`p-3 rounded border ${
                  usedPhotoPrompts.includes(prompt) || pendingPhotoPrompt !== null
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Bestätigung */}
          {pendingPhotoPrompt && (
            <div className="mb-4 p-3 border rounded bg-yellow-100 max-w-xl mx-auto">
              <p className="mb-2 font-semibold">Bestätige die Verwendung der Frage:</p>
              <p className="mb-4 font-bold">
                Schick mir ein Foto von {pendingPhotoPrompt}, das du von deinem Standort aus erkennen kannst.
              </p>
              <button
                onClick={confirmUsePhotoPrompt}
                className="btn p-2 mr-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Bestätigen
              </button>
              <button
                onClick={cancelUsePhotoPrompt}
                className="btn p-2 bg-gray-400 rounded hover:bg-gray-500"
              >
                Abbrechen
              </button>
            </div>
          )}

          {/* Anzeige nach Bestätigung */}
          {selectedPhotoCard && (
            <div className="border rounded p-4 bg-white shadow text-lg font-bold max-w-xl mx-auto">
              {selectedPhotoCard}
            </div>
          )}
        </>
      )}

      {/* Maße */}
      {view === "masse" && (
        <>
          <button
            onClick={() => {
              setView("menu");
              setPendingMasseOption(null);
              setDistanceInput("");
            }}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zum Menü
          </button>

          <h2 className="text-xl font-semibold mb-4">Maße</h2>

          {!pendingMasseOption && (
            <div className="grid grid-cols-2 gap-2 max-w-xl mx-auto">
              {masseOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => requestUseMasseOption(option)}
                  disabled={usedMasseOptions.includes(option)}
                  className={`p-3 rounded border ${
                    usedMasseOptions.includes(option)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-orange-600 text-white hover:bg-orange-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {pendingMasseOption && (
            <div className="max-w-xl mx-auto mt-4 p-3 border rounded bg-yellow-100">
              <p className="mb-2 font-semibold">Gib deine Entfernung zum {pendingMasseOption} in Metern ein:</p>
              <input
                type="number"
                value={distanceInput}
                onChange={(e) => setDistanceInput(e.target.value)}
                placeholder="z.B. 150"
                className="p-2 border rounded w-full mb-3"
              />
              <button
                onClick={confirmUseMasseOption}
                className="btn p-2 mr-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Bestätigen
              </button>
              <button
                onClick={cancelUseMasseOption}
                className="btn p-2 bg-gray-400 rounded hover:bg-gray-500"
              >
                Abbrechen
              </button>
            </div>
          )}

          {/* Anzeige nach Bestätigung */}
          {selectedMasseCard && (
            <div className="border rounded p-4 bg-white shadow text-lg font-bold max-w-xl mx-auto">
              {selectedMasseCard}
            </div>
          )}
        </>
      )}

      {/* Thermometer */}
      {view === "thermometer" && (
        <>
          <button
            onClick={() => setView("menu")}
            className="btn p-2 mb-4 bg-gray-300 rounded hover:bg-gray-400 self-start"
          >
            &larr; Zurück zum Menü
          </button>

          <Thermometer
            disabled={savedThermometerData.confirmed}
            savedData={savedThermometerData}
            onSave={saveThermometerData}
          />

          {savedThermometerData.confirmed && savedThermometerData.distance && (
            <div className="border rounded p-4 bg-white shadow text-lg font-bold max-w-xl mx-auto mt-4">
              Frage verwendet: Ich bin {savedThermometerData.distance} gelaufen. Bin ich jetzt näher (wärmer) oder weiter weg (kälter)?
            </div>
          )}
        </>
      )}
    </div>
  );
}
