import { useState } from 'react';
import MainMenu from './MainMenu';
import HiderView from './HiderView';
import SeekerView from './SeekerView';

export default function App() {
  const [team, setTeam] = useState(null);

  if (!team) return <MainMenu onSelectTeam={setTeam} />;

  if (team === 'hider') return <HiderView />;
  if (team === 'seeker') return <SeekerView />;

  return null;
}
