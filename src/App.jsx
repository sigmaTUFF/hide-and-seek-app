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

const drawRandom = (cards) => {
  const index = Math.floor(Math.random() * cards.length);
  return cards[index];
};

export default function App() {
  const [bonus, setBonus] = useState(null);
  const [curse, setCurse] = useState(null);
  const [power, setPower] = useState(null);

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-xl font-bold mb-4">Hide & Seek – Karten ziehen</h1>

      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setBonus(drawRandom(bonusCards))}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Bonuskarte ziehen
        </button>
        <button
          onClick={() => setCurse(drawRandom(curseCards))}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Fluchkarte ziehen
        </button>
        <button
          onClick={() => setPower(drawRandom(powerUpCards))}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Power-Up ziehen
        </button>
      </div>

      {bonus && <p className="mb-2">Bonus: {bonus}</p>}
      {curse && <p className="mb-2">Fluch: {curse}</p>}
      {power && <p className="mb-2">Power-Up: {power}</p>}
    </div>
  );
}
