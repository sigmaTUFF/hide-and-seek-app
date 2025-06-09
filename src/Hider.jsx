import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // NEU

const cardsWithCount = [
  { text: "+3 Minuten Bonuszeit", count: 25, description: "Nachdem du gefunden wurdest, werden dir 3 Minuten extra zur Versteckzeit gutgeschrieben (wenn im Inventar).", example: "Gefunden nach 60 Minuten → zählt wie 63 Minuten." },
  { text: "+5 Minuten Bonuszeit", count: 15, description: "Bonuszeit nach dem Finden: 5 Minuten werden dir gutgeschrieben (nur bei Besitz).", example: "60 Minuten → zählt wie 65 Minuten." },
  { text: "+10 Minuten Bonuszeit", count: 10, description: "Wenn du gefunden wirst, zählt deine Zeit mit 10 Minuten Extra.", example: "60 Minuten → zählt wie 70 Minuten." },
  { text: "+15 Minuten Bonuszeit", count: 3, description: "Erhöhe deine gewertete Versteckzeit um 15 Minuten.", example: "Gefunden nach 50 Minuten → zählt wie 65 Minuten." },
  { text: "+20 Minuten Bonuszeit", count: 2, description: "Erhöhe deine Versteckzeit-Wertung um 20 Minuten.", example: "Gefunden nach 55 Minuten → zählt wie 75 Minuten." },
  { text: "Duplicate-Karte", count: 2, description: "Du darfst eine beliebige Karte aus deinem Inventar duplizieren (kopieren). Danach wird die Duplikat-Karte verbraucht.", example: "Du hast +10 Minuten Bonus und nutzt Duplicate → bekommst sie ein zweites Mal." },
  { text: "Inventar-Erweiterung", count: 3, description: "Erhöht dein Inventarlimit dauerhaft von 6 auf 7 (max. 10), wenn du sie benutzt.", example: "Nach Aktivierung kannst du 7 Karten tragen." },
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

export default function Hider() {
  const navigate = useNavigate(); // NEU
  const [deck, setDeck] = useState(() => createDeck(cardsWithCount));
  const [hiderInventory, setHiderInventory] = useState(() => {
    const saved = localStorage.getItem("hiderInventory");
    return saved ? JSON.parse(saved) : [];
  });
  const [maxInventorySize, setMaxInventorySize] = useState(() => {
    const saved = localStorage.getItem("maxInventorySize");
    return saved ? parseInt(saved, 10) : 6;
  });
  const [currentCard, setCurrentCard] = useState(null);
  const [pendingCard, setPendingCard] = useState(null);
  const [showCardDetail, setShowCardDetail] = useState(null);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDuplicatePrompt, setShowDuplicatePrompt] = useState(false);

  useEffect(() => {
    localStorage.setItem("hiderInventory", JSON.stringify(hiderInventory));
  }, [hiderInventory]);

  useEffect(() => {
    localStorage.setItem("maxInventorySize", maxInventorySize.toString());
  }, [maxInventorySize]);

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

    if (hiderInventory.length >= maxInventorySize) {
      setPendingCard(card);
    } else {
      setHiderInventory((prev) => [...prev, card]);
      setCurrentCard(card);
    }
  };

  const removeCard = (index) => setConfirmDeleteIndex(index);
  const confirmRemove = () => {
    setHiderInventory((prev) => prev.filter((_, i) => i !== confirmDeleteIndex));
    setConfirmDeleteIndex(null);
  };
  const cancelRemove = () => setConfirmDeleteIndex(null);

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

  const resetGame = () => setShowResetConfirm(true);

  const confirmReset = () => {
    setDeck(createDeck(cardsWithCount));
    setHiderInventory([]);
    setCurrentCard(null);
    setPendingCard(null);
    setShowCardDetail(null);
    setConfirmDeleteIndex(null);
    setShowResetConfirm(false);
    setMaxInventorySize(6);
    localStorage.removeItem("hiderInventory");
    localStorage.removeItem("maxInventorySize");
    navigate("/"); // ← LEITET NACH RESET ZUM HAUPTMENÜ
  };

  const cancelReset = () => setShowResetConfirm(false);

  const duplicateCard = (cardToDuplicate) => {
    const updated = [...hiderInventory];
    const duplicateIndex = updated.indexOf("Duplicate-Karte");

    if (duplicateIndex === -1) return;

    // Karte hinzufügen oder ersetzen:
    if (updated.length < maxInventorySize) {
      updated.push(cardToDuplicate);
    } else {
      // Wenn voll, ersetze Duplicate selbst
      updated[duplicateIndex] = cardToDuplicate;
    }

    setHiderInventory(updated);
    setShowDuplicatePrompt(false);
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
        <h3 className="font-semibold mb-2">
          Dein Inventar ({hiderInventory.length}/{maxInventorySize}):
        </h3>
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
                >
                  i
                </button>

                {card === "Duplicate-Karte" && (
                  <button
                    onClick={() => setShowDuplicatePrompt(true)}
                    className="px-2 py-0.5 bg-blue-600 text-white rounded hover:bg-blue-700"
                    title="Karte duplizieren"
                  >
                    ⧉
                  </button>
                )}

                {card === "Inventar-Erweiterung" && (
                  <button
                    onClick={() => {
                      setHiderInventory((prev) => {
                        const updated = [...prev];
                        updated.splice(idx, 1);
                        return updated;
                      });
                      setMaxInventorySize((prev) =>
                        Math.min(prev + 1, 10)
                      );
                    }}
                    className="px-2 py-0.5 bg-green-600 text-white rounded hover:bg-green-700"
                    title="Inventar erweitern"
                  >
                    ⬆️
                  </button>
                )}

                <button
                  onClick={() => removeCard(idx)}
                  className="px-2 py-0.5 bg-red-500 text-white rounded hover:bg-red-700"
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

      {confirmDeleteIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
            <p className="mb-4">
              Karte{" "}
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

      {showDuplicatePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
            <h3 className="text-lg font-bold mb-4">
              Welche Karte möchtest du duplizieren?
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {hiderInventory
                .filter((card) => card !== "Duplicate-Karte")
                .map((card, idx) => (
                  <button
                    key={idx}
                    onClick={() => duplicateCard(card)}
                    className="border rounded p-2 bg-blue-500 text-white hover:bg-blue-600"
                  >
                    {card}
                  </button>
                ))}
            </div>
            <button
              onClick={() => setShowDuplicatePrompt(false)}
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
