import { useState, useMemo } from "react";

// Definiere alle Karten mit jeweiliger Anzahl (Häufigkeit)
const cardsWithCount = [
  // Bonus
  { text: "+5 Minuten Bonuszeit", count: 5 },
  { text: "+10 Minuten Bonuszeit", count: 4 },
  { text: "+15 Minuten Bonuszeit", count: 3 },
  { text: "+20 Minuten Bonuszeit", count: 2 },
  { text: "+30 Minuten Bonuszeit", count: 1 },

  // Flüche
  { text: "Dorfgrenzen-Fluch: Du darfst deinen aktuellen Ortsteil 10 Minuten lang nicht verlassen.", count: 5 },
  { text: "Picknick-Fluch: Du musst dich zu einer Liegewiese oder Sitzbank begeben und 5 Minuten dort bleiben.", count: 5 },
  { text: "Ortsschild-Fluch: Deine nächste Bewegung muss zu einem Ortsschild führen.", count: 5 },
  { text: "Kirchturmuhr-Fluch: Du darfst dich erst weiterbewegen, wenn eine volle Viertelstunde beginnt.", count: 5 },
  { text: "Bäcker-Fluch: Du musst ein Foto von einer lokalen Bäckerei machen, bevor du weitermachen darfst.", count: 5 },
  { text: "Selfie-Fluch: Mache ein Selfie mit einem Denkmal oder Ortsschild.", count: 3 },
  { text: "Feldrand-Fluch: Du musst dich in der Nähe eines Feldrandes aufhalten (max. 100 m).", count: 2 },

  // Power-Ups
  { text: "Zufallsfrage: Du darfst eine beliebige Frage stellen, ohne Kostenregel.", count: 5 },
  { text: "Veto: Du darfst eine Frage einmal ablehnen.", count: 4 },
  { text: "Kopiereffekt: Du darfst den letzten Effekt (Bonus oder Power) erneut nutzen.", count: 3 },
  { text: "Versteck-Wechsel-Karte: Alles wird 30 Minuten eingefroren. Du darfst dein Versteck wechseln. (Nur 1x im Spiel)", count: 3 },
];

// Hilfsfunktion: Erzeuge ein Array mit den Karten unter Berücksichtigung der Häufigkeit
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
  const [team, setTeam] = useState(null); // hider oder seeker
  const [deck, setDeck] = useState(() => createDeck(cardsWithCount));
  const [hiderInventory, setHiderInventory] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  // Karte ziehen: Zufällig aus dem verbliebenen Deck ziehen
  const drawCard = () => {
    if (deck.length === 0) {
      setCurrentCard("Keine Karten mehr im Stapel!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];

    // Karte aus Deck entfernen
    const newDeck = [...deck];
    newDeck.splice(randomIndex, 1);
    setDeck(newDeck);

    setCurrentCard(card);
    if (team === "hider") {
      setHiderInventory((prev) => [...prev, card]);
    }
  };

  if (!team) {
    // Team wählen
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

  // Team Hider UI
  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-xl font-bold mb-4">Hide & Seek – Karten ziehen</h1>

      <button
        onClick={drawCard}
        disabled={deck.length === 0}
        className={`btn p-2 border rounded mb-4 text-white ${
          deck.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
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
        <h3 className="font-semibold mb-2">Dein Inventar:</h3>
        {hiderInventory.length === 0 && <p>Keine Karten gezogen.</p>}
        <div className="flex flex-wrap justify-center gap-2">
          {hiderInventory.map((card, idx) => (
            <div
              key={idx}
              className="border rounded p-2 max-w-xs bg-gray-100"
              style={{ minWidth: "200px" }}
            >
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
