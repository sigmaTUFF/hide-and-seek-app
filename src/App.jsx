import React, { useState } from "react";
import "./App.css";

const cardPool = [
  { title: "Picknick-Fluch", description: "Zwingt den Sucher, eine Runde lang zu pausieren.", count: 5 },
  { title: "Schatten-Tarnung", description: "Du kannst dich einmal vor dem Sucher verstecken, selbst wenn er dich fast findet.", count: 4 },
  { title: "Routen-Tausch", description: "Tausche deinen Standort mit einem anderen Hider.", count: 1 },
  { title: "Karten-Scanner", description: "Zeigt dir die obersten 3 Karten im Stapel.", count: 3 },
  { title: "Tarnumhang", description: "Du bist für 2 Runden unauffindbar.", count: 2 },
  { title: "Späherblick", description: "Du darfst 2 Karten ziehen und eine behalten.", count: 5 },
  { title: "Fake-Spur", description: "Verwirrt den Sucher für eine Runde.", count: 4 },
  { title: "Lautlose Schuhe", description: "Du darfst dich doppelt so weit bewegen.", count: 6 },
  { title: "Ablenkungswurf", description: "Ziehe die Aufmerksamkeit des Suchers von deinem Team ab.", count: 5 },
  { title: "Tauschkarte", description: "Tausche eine Karte aus deinem Inventar mit einer zufälligen aus dem Stapel.", count: 5 },
  { title: "Positionswechsel+", description: "Wechsle mit einem beliebigen Hider den Ort.", count: 1 },
  { title: "Karte löschen", description: "Löscht eine unerwünschte Karte direkt aus dem Stapel.", count: 4 },
  { title: "Scan-Joker", description: "Du darfst eine Karte deiner Wahl aus dem Stapel ziehen.", count: 4 },
  { title: "Zusatz-Zug", description: "Ziehe sofort eine weitere Karte.", count: 6 }
];

const generateDeck = () => {
  const deck = [];
  cardPool.forEach((card) => {
    for (let i = 0; i < card.count; i++) {
      deck.push({ title: card.title, description: card.description });
    }
  });
  return shuffleArray(deck);
};

const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

function App() {
  const [deck, setDeck] = useState(generateDeck());
  const [inventory, setInventory] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [popupCard, setPopupCard] = useState(null);

  const drawCard = () => {
    if (deck.length === 0) return;
    const [topCard, ...rest] = deck;
    setDeck(rest);

    if (inventory.length < 6) {
      setInventory([...inventory, topCard]);
    } else {
      setSelectedCardIndex(0); // default first card to be replaced
      const replace = window.confirm("Inventar voll. Möchtest du eine Karte ersetzen?");
      if (replace) {
        const index = prompt("Welche Karte soll ersetzt werden? Gib eine Zahl von 1 bis 6 ein:");
        const i = parseInt(index) - 1;
        if (!isNaN(i) && i >= 0 && i < 6) {
          const updated = [...inventory];
          updated[i] = topCard;
          setInventory(updated);
        } else {
          alert("Ungültiger Index. Karte verworfen.");
        }
      } else {
        alert("Karte verworfen.");
      }
    }
  };

  const removeCard = (index) => {
    const newInventory = [...inventory];
    newInventory.splice(index, 1);
    setInventory(newInventory);
  };

  return (
    <div className="App">
      <h1>🎴 Hider Kartenstapel</h1>
      <button onClick={drawCard} className="draw-button">
        Zufällige Karte ziehen
      </button>

      <h2>👜 Inventar ({inventory.length}/6)</h2>
      <div className="inventory">
        {inventory.map((card, idx) => (
          <div key={idx} className="card-small">
            <strong>{card.title}</strong>
            <button onClick={() => setPopupCard(card)}>ℹ️</button>
            <button onClick={() => removeCard(idx)}>❌</button>
          </div>
        ))}
      </div>

      {popupCard && (
        <div className="card-popup" onClick={() => setPopupCard(null)}>
          <div className="card-large">
            <h2>{popupCard.title}</h2>
            <p>{popupCard.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
