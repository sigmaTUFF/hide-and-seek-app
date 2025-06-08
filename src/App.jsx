import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const drawRandom = (cards: string[]) => {
  const index = Math.floor(Math.random() * cards.length);
  return cards[index];
};

export default function HideAndSeekApp() {
  const [role, setRole] = useState<"hider" | "seeker" | null>(null);
  const [bonus, setBonus] = useState<string | null>(null);
  const [curse, setCurse] = useState<string | null>(null);
  const [power, setPower] = useState<string | null>(null);

  if (!role) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <h1 className="text-xl font-bold mb-4">Hide & Seek</h1>
        <p className="mb-4">Wähle dein Team:</p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => setRole("hider")}>Ich bin ein Hider</Button>
          <Button onClick={() => setRole("seeker")}>Ich bin ein Seeker</Button>
        </div>
      </div>
    );
  }

  if (role === "seeker") {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <h1 className="text-xl font-bold mb-4">Seeker-Modus</h1>
        <p>Hier kommt später der Fragebogen hin!</p>
        <Button className="mt-4" onClick={() => setRole(null)}>
          Zurück
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-xl font-bold mb-4">Hide & Seek – Hider-Modus</h1>

      <Tabs defaultValue="bonus" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="bonus">Bonus</TabsTrigger>
          <TabsTrigger value="curse">Fluch</TabsTrigger>
          <TabsTrigger value="power">Power-Up</TabsTrigger>
        </TabsList>

        <TabsContent value="bonus">
          <Card>
            <CardContent className="p-4">
              <Button onClick={() => setBonus(drawRandom(bonusCards))} className="mb-2">
                Bonuskarte ziehen
              </Button>
              {bonus && <p>{bonus}</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curse">
          <Card>
            <CardContent className="p-4">
              <Button onClick={() => setCurse(drawRandom(curseCards))} className="mb-2">
                Fluchkarte ziehen
              </Button>
              {curse && <p>{curse}</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="power">
          <Card>
            <CardContent className="p-4">
              <Button onClick={() => setPower(drawRandom(powerUpCards))} className="mb-2">
                Power-Up ziehen
              </Button>
              {power && <p>{power}</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button className="mt-4" onClick={() => setRole(null)}>
        Zurück zur Auswahl
      </Button>
    </div>
  );
}

