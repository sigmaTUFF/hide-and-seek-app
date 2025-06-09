import { useState, useEffect } from "react"; // useEffect hinzugefügt

// Kartendefinitionen mit Erklärung und Beispiel
const cardsWithCount = [
  {
    text: "+5 Minuten Bonuszeit",
    count: 5,
    description: "Du erhältst 5 Minuten extra Zeit, bevor die Sucher starten.",
    example: "Start ist 15:00 – du darfst dich bis 15:05 verstecken.",
  },
  {
    text: "+10 Minuten Bonuszeit",
    count: 4,
    description: "Du bekommst 10 Minuten extra Versteckzeit.",
    example: "Start ist 15:00 – du darfst dich bis 15:10 verstecken.",
  },
  {
    text: "+15 Minuten Bonuszeit",
    count: 3,
    description: "Du bekommst 15 Minuten extra Versteckzeit.",
    example: "Start ist 15:00 – du darfst dich bis 15:15 verstecken.",
  },
  {
    text: "+20 Minuten Bonuszeit",
    count: 2,
    description: "Du bekommst 20 Minuten extra Versteckzeit.",
    example: "Start ist 15:00 – du darfst dich bis 15:20 verstecken.",
  },
  {
    text: "+30 Minuten Bonuszeit",
    count: 1,
    description: "Du bekommst 30 Minuten extra Versteckzeit.",
    example: "Start ist 15:00 – du darfst dich bis 15:30 verstecken.",
  },
  {
    text: "Dorfgrenzen-Fluch",
    count: 5,
    description: "Alle Hider dürfen sich nur innerhalb bestimmter Orte verstecken.",
    example: "Nur innerhalb der Kirche, dem Spielplatz und dem Marktplatz.",
  },
  {
    text: "Picknick-Fluch",
    count: 5,
    description: "Du darfst dich nur dort verstecken, wo man theoretisch ein Picknick machen kann.",
    example: "Zum Beispiel: Wiese, Parkbank, Tisch im Freien.",
  },
  {
    text: "Ortsschild-Fluch",
    count: 5,
    description: "Du darfst dich nur in der Nähe eines Ortsschilds verstecken.",
    example: "Innerhalb von 20 Metern um ein Ortsschild.",
  },
  {
    text: "Kirchturmuhr-Fluch",
    count: 5,
    description: "Du darfst dich nur in Sichtweite der Kirchturmuhr verstecken.",
    example: "Wo man direkt die Uhrzeit auf dem Turm erkennen kann.",
  },
  {
    text: "Bäcker-Fluch",
    count: 5,
    description: "Du darfst dich nur in der Nähe eines Bäckers verstecken.",
    example: "Hinter dem Gebäude, am Lieferhof oder im Hinterhof.",
  },
  {
    text: "Selfie-Fluch",
    count: 3,
    description: "Du musst beim Verstecken ein Selfie an einem bestimmten Ort machen.",
    example: "Zum Beispiel mit einem Ortsschild oder Denkmal im Hintergrund.",
  },
  {
    text: "Feldrand-Fluch",
    count: 2,
    description: "Du darfst dich nur am Rand eines Feldes verstecken.",
    example: "Nicht mitten im Feld, sondern am Übergang zu Wiese/Weg.",
  },
  {
    text: "Zufallsfrage",
    count: 5,
    description: "Ein Mitspieler stellt dir spontan eine Frage. Beantworte sie richtig, sonst verlierst du deine Karte.",
    example: "Z. B.: Wie viele Beine hat eine Spinne?",
  },
  {
    text: "Veto",
    count: 4,
    description: "Du kannst eine Regel oder Karte ablehnen.",
    example: "Ein Hider spielt den 'Dorfgrenzen-Fluch' – du setzt 'Veto' ein.",
  },
  {
    text: "Kopiereffekt",
    count: 3,
    description: "Du kopierst den Effekt der letzten gespielten Karte.",
    example: "Ein Spieler nutzt +10 Minuten – du bekommst auch +10 Minuten.",
  },
  {
    text: "Versteck-Wechsel-Karte",
    count: 3,
    description: "Du darfst dein Versteck einmal während des Spiels wechseln.",
    example: "Nach 10 Minuten tauschst du dein Versteck.",
  },
];

function createDeck(cardsWithCount) {
  const deck = [];
  cardsWithCount.forEach(({ text, count }) => {
    for (let i = 0; i < count; i++) {
      deck.push(text);
    }
  });
  return deck;
}

function getCardInfo(cardText) {
  const card = cardsWithCount.find((c) => c.text === cardText);
  if (!card) return null;
  return {
    title: card.text,
    description: card.description || "Keine Beschreibung vorhanden.",
    example: card.example || "Kein Beispiel vorhanden.",
  };
}

export default function HideAndSeekApp() {
  const [team, setTeam] = useState(null);
  const [deck, setDeck] = useState(() => createDeck(cardsWithCount));
  // Hier aus LocalStorage laden, falls vorhanden:
  const [hiderInventory, setHiderInventory] = useState(() => {
    const saved = localStorage.getItem("hiderInventory");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentCard, setCurrentCard] = useState(null);
  const [pendingCard, setPendingCard] = useState(null);
  const [showCardDetail, setShowCardDetail] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Bei Änderungen im Inventar: Speichern ins LocalStorage
  useEffect(() => {
    localStorage.setItem("hiderInventory", JSON.stringify(hiderInventory));
  }, [hiderInventory]);

  const drawCard = () => {
    if (deck.length === 0) {
      setCurrentCard("Keine Karten mehr im Stapel!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];

    const newDeck = [...deck];
    newDeck.splice(randomIndex, 1);
    setDeck(newDeck);

    if (hiderInventory.length >= 6) {
      setPendingCard(card);
    } else {
      setHiderInventory((prev) => [...prev, card]);
      setCurrentCard(card);
    }
  };

  const removeCard = (index) => {
    setConfirmDeleteIndex(index);
  };

  const confirmRemove = () => {
    setHiderInventory((prev) =>
      prev.filter((_, i) => i !== confirmDeleteIndex)
    );
    setConfirmDeleteIndex(null);
  };

  const cancelRemove = () => {
    setConfirmDeleteIndex(null);
  };

  const replaceCard = (index) => {
    if (!pendingCard) return;

    setHiderInventory((prev) => {
      const newInv = [...prev];
      newInv[index] = pendingCard;
      return newInv;
    });

    setCurrentCard(pendingCard);
    setPendingCard(null);
  };

  // Reset starten (zeigt Bestätigung)
  const resetGame = () => {
    setShowResetConfirm(true);
  };

  // Reset bestätigen und alles löschen inkl. localStorage
  const confirmReset = () => {
    setTeam(null);
    setDeck(createDeck(cardsWithCount));
    setHiderInventory([]);
    setCurrentCard(null);
    setPendingCard(null);
    setShowCardDetail(null);
    setConfirmDeleteIndex(null);
    setShowResetConfirm(false);

    localStorage.removeItem("hiderInventory"); // LocalStorage löschen
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  if (!team) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <h1 className="text-xl font-bold mb-4">Wähle dein Team</h1>
        <button
          className="btn m-2 p-2 border rounded bg-blue-500 text-white"
          onClick={() => setTeam("hider")}
        >
          Hider
        </button>
        <button
          className="btn m-2 p-2 border rounded bg-green-500 text-white"
          onClick={() => setTeam("seeker")}
        >
          Seeker
        </button>
      </div>
    );
  }

  if (team === "seeker") {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <h1 className="text-xl font-bold mb-4">Du bist im Seeker-Team</h1>
        <p>Hier kommt später das Fragebogen-Feature rein.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 text-center flex flex-col min-h-screen">
      <h1 className="text-xl font-bold mb-4">Hide & Seek – Karten ziehen</h1>

      <button
        onClick={drawCard}
        disabled={deck.length === 0 || pendingCard !== null}
        className={`btn p-2 border rounded mb-4 text-white ${
          deck.length === 0 || pendingCard !== null
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500"
        }`}
      >
        Karte ziehen ({deck.length} übrig)
      </button>

      {currentCard && (
        <div className="border p-4 rounded bg-white shadow mb-4 max-w-xl mx-auto">
          <h3 className="font-semibold mb-2">Gezogene Karte:</h3>
          <p>{currentCard}</p>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-2">Dein Inventar (max. 6 Karten):</h3>
        {hiderInventory.length === 0 && <p>Keine Karten gezogen.</p>}
        <div className="flex flex-wrap justify-center gap-2">
          {hiderInventory.map((card, idx) => (
            <div
              key={idx}
              className="border rounded p-2 bg-gray-100 flex items-center justify-between gap-2"
              style={{ minWidth: "200px" }}
            >
              <span>{card}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setShowCardDetail(card)}
                  className="px-2 py-0.5 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  title="Details anzeigen"
                >
                  i
                </button>
                <button
                  onClick={() => removeCard(idx)}
                  className="px-2 py-0.5 bg-red-500 text-white rounded hover:bg-red-700"
                  title="Karte löschen"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ersatzkarte */}
      {pendingCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
            <h3 className="text-lg font-bold mb-4">
              Inventar voll! Welche Karte möchtest du ersetzen?
            </h3>
            <p className="mb-2 font-semibold">Neue Karte:</p>
            <div className="mb-4 border p-2 rounded">{pendingCard}</div>
            <div className="flex flex-wrap justify-center gap-2">
              {hiderInventory.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => replaceCard(idx)}
                  className="border rounded p-2 bg-blue-500 text-white hover:bg-blue-600"
                >
                  Ersetze Karte {idx + 1}: {card}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setPendingCard(null);
                setCurrentCard(null);
              }}
              className="mt-4 px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Kartendetails */}
      {showCardDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">{showCardDetail}</h2>
            {(() => {
              const info = getCardInfo(showCardDetail);
              if (!info) return <p>Keine weiteren Informationen.</p>;
              return (
                <>
                  <p className="mb-2">{info.description}</p>
                  <p className="italic">Beispiel: {info.example}</p>
                </>
              );
            })()}
            <button
              onClick={() => setShowCardDetail(null)}
              className="mt-4 px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
            >
              Schließen
            </button>
          </div>
        </div>
      )}

      {/* Bestätigung Karte löschen */}
      {confirmDeleteIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
            <p className="mb-4">
              Willst du die Karte{" "}
              <strong>{hiderInventory[confirmDeleteIndex]}</strong> wirklich
              löschen?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmRemove}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Löschen
              </button>
              <button
                onClick={cancelRemove}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="mt-auto pt-4 border-t mt-6">
        <button
          onClick={resetGame}
          className="btn p-2 border rounded bg-red-600 text-white hover:bg-red-700"
        >
          Spiel zurücksetzen
        </button>
      </div>

      {/* Reset bestätigen */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
            <p className="mb-4 font-semibold">
              Willst du das Spiel wirklich zurücksetzen? Alle Daten gehen
              verloren!
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmReset}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Ja, zurücksetzen
              </button>
              <button
                onClick={cancelReset}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
