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

export default function HiderView() {
  // ... Hauptcode bleibt unverändert (wegen Länge hier weggelassen)
  return <div>Hider-Ansicht</div>;
}
