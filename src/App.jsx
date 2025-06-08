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

function drawRandom(cards) {
  const index = Math.floor(Math.random() * cards.length);
  return cards[index];
}

export default function App() {
  const [role, setRole] = useState(null); // 'hider' oder 'seeker'

  const [bonus, setBonus] = useState(null);
  const [curse, setCurse] = useState(null);
  const [power, setPower] = useState(null);

  if (!role) {
    return (
      <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
        <h1>Hide & Seek – Wähle deine Rolle</h1>
        <button style={{ margin: "10px", padding: "10px 20px" }} onClick={() => setRole("hider")}>Hider</button>
        <button style={{ margin: "10px", padding: "10px 20px" }} onClick={() => setRole("seeker")}>Seeker</button>
      </div>
    );
  }

  if (role === "seeker") {
    return (
      <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
        <h1>Seeker Bereich (noch leer)</h1>
        <p>Hier kommt später dein Fragebogen mit Preis-Logik.</p>
        <button style={{ marginTop: "20px" }} onClick={() => setRole(null)}>Zurück zur Rollenwahl</button>
      </div>
    );
  }

  // role === 'hider'
  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Hide & Seek – Karten ziehen (Hider)</h1>

      <div style={{ marginBottom: "20px" }}>
        <button style={{ margin: "5px", padding: "10px" }} onClick={() => setBonus(drawRandom(bonusCards))}>Bonuskarte ziehen</button>
        {bonus && <p>Bonus: {bonus}</p>}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button style={{ margin: "5px", padding: "10px" }} onClick={() => setCurse(drawRandom(curseCards))}>Fluchkarte ziehen</button>
        {curse && <p>Fluch: {curse}</p>}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button style={{ margin: "5px", padding: "10px" }} onClick={() => setPower(drawRandom(powerUpCards))}>Power-Up ziehen</button>
        {power && <p>Power-Up: {power}</p>}
      </div>

      <button style={{ marginTop: "30px" }} onClick={() => setRole(null)}>Zurück zur Rollenwahl</button>
    </div>
  );
}