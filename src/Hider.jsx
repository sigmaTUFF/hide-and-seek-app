import { useState, useEffect } from "react";

// 📦 Kartenstapel mit neuen Bonuskarten + 2x Duplicate
const cardsWithCount = [
  {
    text: "3 Minuten Bonuszeit",
    count: 25,
    description:
      "Wenn du gefunden wirst, werden dir 3 Minuten extra auf deine Versteckzeit angerechnet – aber nur, wenn du die Karte im Inventar hast.",
  },
  {
    text: "5 Minuten Bonuszeit",
    count: 15,
    description:
      "Wenn du gefunden wirst, bekommst du 5 Minuten extra auf deine Versteckzeit angerechnet – nur gültig, wenn sie im Inventar ist.",
  },
  {
    text: "10 Minuten Bonuszeit",
    count: 10,
    description:
      "Diese Karte gibt dir 10 Minuten Bonuszeit zur eigentlichen Versteckzeit – vorausgesetzt, sie befindet sich im Inventar.",
  },
  {
    text: "15 Minuten Bonuszeit",
    count: 3,
    description:
      "Diese Karte erhöht deine Versteckzeit nach dem Finden um 15 Minuten – nur gültig, wenn sie im Inventar liegt.",
  },
  {
    text: "20 Minuten Bonuszeit",
    count: 2,
    description:
      "Du bekommst 20 Minuten Bonus auf deine Versteckzeit, wenn du diese Karte beim Finden im Inventar hast.",
  },
  {
    text: "Duplicate-Karte",
    count: 2,
    description:
      "Du darfst eine beliebige Karte aus deinem Inventar duplizieren. Die Duplicate-Karte wird dabei verbraucht.",
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
  };
}

export default function Hider() {
  const [deck, setDeck] = useState(() => createDeck(cardsWithCount));
  const [hiderInventory, setHiderInventory] = useState(() => {
    const saved = localStorage.getItem("hiderInventory");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentCard, setCurrentCard] = useState(null);
  const [pendingCard, setPendingCard] = useState(null);
  const [showCardDetail, setShowCardDetail] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDuplicatePicker, setShowDuplicatePicker] = useState(false);

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

    if (card === "Duplicate-Karte") {
      setHiderInventory((prev) => [...prev, card]);
      setCurrentCard(card);
      return;
    }

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

  const resetGame = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setDeck(createDeck(cardsWithCount));
    setHiderInventory([]);
    setCurrentCard(null);
    setPendingCard(null);
    setShowCardDetail(null);
    setConfirmDeleteIndex(null);
    setShowResetConfirm(false);
    localStorage.removeItem("hiderInventory");
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

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
                {card === "Duplicate-Karte" && (
                  <button
                    onClick={() => setShowDuplicatePicker(true)}
                    className="px-2 py-0.5 bg-purple-500 text-white rounded hover:bg-purple-600"
                    title="Karte duplizieren"
                  >
                    ⧉
                  </button>
                )}
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

      {showCardDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">{showCardDetail}</h2>
            {(() => {
              const info = getCardInfo(showCardDetail);
              if (!info) return <p>Keine weiteren Informationen.</p>;
              return <p>{info.description}</p>;
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

      {showDuplicatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
            <h3 className="text-lg font-bold mb-4">
              Welche Karte möchtest du duplizieren?
            </h3>
            <div className="flex flex-wrap justify-center gap-2 max-h-60 overflow-y-auto">
              {hiderInventory
                .map((card, idx) => ({ card, idx }))
                .filter(({ card }) => card !== "Duplicate-Karte")
                .map(({ card, idx }) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setHiderInventory((prev) => {
                        const updated = [...prev];
                        updated.push(card);
                        const dupIndex = updated.indexOf("Duplicate-Karte");
                        if (dupIndex !== -1) updated.splice(dupIndex, 1);
                        return updated;
                      });
                      setShowDuplicatePicker(false);
                      setCurrentCard(`Dupliziert: ${card}`);
                    }}
                    className="border rounded p-2 bg-purple-500 text-white hover:bg-purple-600"
                  >
                    {card}
                  </button>
                ))}
            </div>
            <button
              onClick={() => setShowDuplicatePicker(false)}
              className="mt-4 px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      <div className="mt-auto pt-4 border-t mt-6">
        <button
          onClick={resetGame}
          className="btn p-2 border rounded bg-red-600 text-white hover:bg-red-700"
        >
          Spiel zurücksetzen
        </button>
      </div>

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
