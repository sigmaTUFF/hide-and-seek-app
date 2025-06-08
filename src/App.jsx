import { useState } from "react";

// Karten-Array wie vorher (aus Platzgründen hier nur kurz skizziert)
const cardsWithCount = [
  { text: "+5 Minuten Bonuszeit", count: 5 },
  { text: "+10 Minuten Bonuszeit", count: 4 },
  { text: "+15 Minuten Bonuszeit", count: 3 },
  { text: "+20 Minuten Bonuszeit", count: 2 },
  { text: "+30 Minuten Bonuszeit", count: 1 },
  { text: "Dorfgrenzen-Fluch", count: 5 },
  { text: "Picknick-Fluch", count: 5 },
  { text: "Ortsschild-Fluch", count: 5 },
  { text: "Kirchturmuhr-Fluch", count: 5 },
  { text: "Bäcker-Fluch", count: 5 },
  { text: "Selfie-Fluch", count: 3 },
  { text: "Feldrand-Fluch", count: 2 },
  { text: "Zufallsfrage", count: 5 },
  { text: "Veto", count: 4 },
  { text: "Kopiereffekt", count: 3 },
  { text: "Versteck-Wechsel-Karte", count: 3 },
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

export default function HideAndSeekApp() {
  const [team, setTeam] = useState(null);
  const [deck, setDeck] = useState(() => createDeck(cardsWithCount));
  const [hiderInventory, setHiderInventory] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [replaceCardIndex, setReplaceCardIndex] = useState(null);
  const [pendingCard, setPendingCard] = useState(null);
  const [showCardDetail, setShowCardDetail] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

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
      setReplaceCardIndex(null);
    } else {
      setHiderInventory((prev) => [...prev, card]);
      setCurrentCard(card);
    }
  };

  const removeCard = (index) => {
    setHiderInventory((prev) => prev.filter((_, i) => i !== index));
  };

  const replaceCard = (index) => {
    if (pendingCard === null) return;
    setHiderInventory((prev) => {
      const newInv = [...prev];
      newInv[index] = pendingCard;
      return newInv;
    });
    setCurrentCard(pendingCard);
    setPendingCard(null);
    setReplaceCardIndex(null);
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
    <div className="max-w-md mx-auto p-4 text-center">
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
              className="border rounded p-2 max-w-xs bg-gray-100 flex items-center justify-between"
              style={{ minWidth: "200px" }}
            >
              <span className="text-left">{card}</span>
              <div className="flex items-center space-x-2 ml-2">
                <button
                  onClick={() => setShowCardDetail(card)}
                  className="px-2 py-0.5 bg-yellow-400 text-white rounded hover:bg-yellow-600"
                  title="Karte anzeigen"
                >
                  i
                </button>
                <button
                  onClick={() => setConfirmDeleteIndex(idx)}
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

      {pendingCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
            <h3 className="text-lg font-bold mb-4">
              Inventar voll! Welche Karte möchtest du ersetzen?
            </h3>
            <p className="mb-4 font-semibold">Neue Karte:</p>
            <div className="border p-4 mb-4 bg-gray-100 rounded">{pendingCard}</div>

            <div className="flex flex-wrap justify-center gap-2 max-h-64 overflow-y-auto">
              {hiderInventory.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => replaceCard(idx)}
                  className="border p-2 rounded bg-blue-500 text-white hover:bg-blue-700 max-w-xs"
                >
                  {card}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPendingCard(null)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Neue Karte verwerfen
            </button>
          </div>
        </div>
      )}

      {/* Große Spielkarte anzeigen */}
      {showCardDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full aspect-[3/4] flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 text-center">{showCardDetail}</h2>
              <p className="text-gray-700 text-sm text-center">
                Diese Karte hat einen speziellen Effekt im Spiel.
              </p>
            </div>
            <button
              onClick={() => setShowCardDetail(null)}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Schließen
            </button>
          </div>
        </div>
      )}

      {/* Löschbestätigung */}
      {confirmDeleteIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm text-center">
            <h3 className="text-lg font-bold mb-4">Karte wirklich löschen?</h3>
            <p className="mb-4">{hiderInventory[confirmDeleteIndex]}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  removeCard(confirmDeleteIndex);
                  setConfirmDeleteIndex(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Löschen
              </button>
              <button
                onClick={() => setConfirmDeleteIndex(null)}
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
