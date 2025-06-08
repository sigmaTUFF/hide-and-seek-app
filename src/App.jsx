import { useState } from "react";

const bonusCards = [
  "+5 Minuten Bonuszeit",
  "+10 Minuten Bonuszeit",
  "+15 Minuten Bonuszeit",
  "+20 Minuten Bonuszeit",
  "+30 Minuten Bonuszeit",
];

const curseCards = [
  "Dorfgrenzen-Fluch: Du darfst deinen aktuellen Ortsteil 10 Minuten lang nicht verlassen.",
  "Picknick-Fluch: Du musst dich zu einer Liegewiese oder Sitzbank begeben und 5 Minuten dort bleiben.",
  "Ortsschild-Fluch: Deine nächste Bewegung muss zu einem Ortsschild führen.",
  "Kirchturmuhr-Fluch: Du darfst dich erst weiterbewegen, wenn eine volle Viertelstunde beginnt.",
  "Bäcker-Fluch: Du musst ein Foto von einer lokalen Bäckerei machen, bevor du weitermachen darfst.",
  "Selfie-Fluch: Mache ein Selfie mit einem Denkmal oder Ortsschild.",
  "Feldrand-Fluch: Du musst dich in der Nähe eines Feldrandes aufhalten (max. 100 m).",
];

const powerUpCards = [
  "Zufallsfrage: Du darfst eine beliebige Frage stellen, ohne Kostenregel.",
  "Veto: Du darfst eine Frage einmal ablehnen.",
  "Kopiereffekt: Du darfst den letzten Effekt (Bonus oder Power) erneut nutzen.",
  "Versteck-Wechsel-Karte: Alles wird 30 Minuten eingefroren. Du darfst dein Versteck wechseln. (Nur 1x im Spiel)",
];

// Hilfsfunktion, um zufällig eine Karte zu ziehen
function drawRandom(cards) {
  const index = Math.floor(Math.random() * cards.length);
  return cards[index];
}

export default function HideAndSeekApp() {
  const [team, setTeam] = useState(null); // "hider" oder "seeker"
  const [category, setCategory] = useState(null); // bonus, curse, power
  const [hiderInventory, setHiderInventory] = useState([]); // Gesammelte Karten für Hider
  const [currentCard, setCurrentCard] = useState(null);

  const categories = {
    bonus: bonusCards,
    curse: curseCards,
    power: powerUpCards,
  };

  const handleDrawCard = () => {
    if (!category) return;
    const card = drawRandom(categories[category]);
    setCurrentCard(card);
    // Wenn Team Hider, Karte ins Inventar legen
    if (team === "hider") {
      setHiderInventory((prev) => [...prev, card]);
    }
  };

  if (!team) {
    // Auswahl Team
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
      <h1 className="text-xl font-bold mb-4">Hide & Seek – Hider Karten ziehen</h1>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Kategorie wählen (wird zufällig gesetzt):</h2>
        <button
          className="btn m-1 p-2 border rounded bg-gray-300"
          onClick={() => {
            // Kategorie zufällig wählen
            const keys = Object.keys(categories);
            const randomCat = keys[Math.floor(Math.random() * keys.length)];
            setCategory(randomCat);
            setCurrentCard(null);
          }}
        >
          Zufällige Kategorie wählen
        </button>
        {category && <p>Ausgewählte Kategorie: <strong>{category}</strong></p>}
      </div>

      {category && (
        <>
          <button
            onClick={handleDrawCard}
            className="btn p-2 border rounded bg-blue-500 text-white mb-4"
          >
            Karte ziehen
          </button>

          {currentCard && (
            <div className="border p-4 rounded bg-white shadow mb-4">
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
        </>
      )}
    </div>
  );
}
