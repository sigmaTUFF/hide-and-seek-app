export default function MainMenu({ onSelectTeam }) {
  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Wähle dein Team</h1>
      <button onClick={() => onSelectTeam("hider")} className="btn m-2 p-2 bg-blue-500 text-white rounded">Hider</button>
      <button onClick={() => onSelectTeam("seeker")} className="btn m-2 p-2 bg-green-500 text-white rounded">Seeker</button>
    </div>
  );
}
