// eslint-disable-next-line no-unused-vars
import { parseInitialization, parseUrl } from './parse/config';
import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Spinner from './components/atoms/Spinner';
import MainPage from './components/pages/MainPage';
import { useAuth } from './store/auth-context';
import AuthContextProvider from './store/auth-context';
import LeaderboardContextProvider from './store/leaderboard-context';
import DeckViewer from './DeckViewer';
import UploadDecklist from './components/organisms/UploadDecklist';

const deckText = `1 Valgavoth, Harrower of Souls (DSC) 6
1 Arc Lightning (KTK) 97
1 Arcane Signet (MKC) 223
1 Ash Barrens (DSC) 260
1 Barbflare Gremlin (DSC) 26
1 Bitter Triumph (LCI) 91
1 Blasphemous Act (LCC) 216
1 Chain Reaction (C21) 161
1 Command Tower (MKC) 256
1 Court of Ambition (CMR) 114
1 Cranial Plating (BRC) 136
1 Crater's Claws (KTK) 106
1 Damnable Pact (VOC) 126
1 Deluge of Doom (DSC) 18
1 Dictate of the Twin Gods (PJOU) 93★ *F*
1 End the Festivities (VOW) 155
1 Evolving Wilds (MOC) 397
1 Faithless Looting (LCC) 225
1 Fanatic of Mogis (THS) 121
1 Fate Unraveler (DSC) 141
1 Feed the Swarm (OTC) 134
1 Fellwar Stone (OTC) 257
1 Firebolt (EMA) 130
1 Flame Jet (UDS) 81
1 Florian, Voldaren Scion (DSC) 217
1 Foreboding Ruins (LCC) 330
1 Furnace of Rath (10E) 204
1 Galvanic Blast (DDU) 45
1 Gleeful Arsonist (DSC) 56
1 Graven Cairns (DSC) 280
1 Gray Merchant of Asphodel (THS) 89
1 Gut Shot (PLST) MM2-117
1 Hellrider (DKA) 93
1 Honden of Infinite Rage (EMA) 134
1 Infernal Grasp (DSC) 143
1 Inferno Titan (BLC) 198
1 Insurrection (HOP) 57
1 Kederekt Parasite (DSC) 144
2 Lightning Strike (XLN) 149
1 Mayhem Devil (DSC) 225
1 Mind Stone (CLB) 325
1 Mogis, God of Slaughter (DSC) 89
12 Mountain (MKM) 284
1 Murderous Redcap (PLST) SHM-192
1 Night's Whisper (DSC) 79
1 Overlord of the Boilerbilges (DSK) 380
1 Painful Quandary (PBRO) 111p
1 Path of Ancestry (SCD) 312
1 Persistent Constrictor (DSC) 52
1 Play with Fire (MID) 154
1 Prismatic Lens (CMM) 403
1 Pulse of the Forge (DST) 66
1 Pyromatics (GPT) 72
1 Rakdos Carnarium (CLU) 243
1 Rakdos Charm (DSC) 229
1 Rakdos Signet (DSC) 250
1 Ranger's Firebrand (LTR) 143
1 Read the Bones (DSC) 154
1 Reckless Impulse (VOW) 174
1 Rocky Tar Pit (DMC) 228
1 Searing Spear (J22) 597
1 Seething Song (ARC) 46
1 Shard of the Nightbringer (40K) 55
1 Shivan Devastator (PDMU) 143p
1 Shivan Gorge (DSC) 297
1 Shock (BBD) 184
1 Shrine of Burning Rage (NPH) 153
1 Sign in Blood (DSC) 156
1 Smash to Smithereens (ORI) 163
1 Smoldering Marsh (DMC) 234
1 Sol Ring (OTC) 267
1 Solphim, Mayhem Dominus (PONE) 150p
1 Spark Spray (DMR) 141
1 Spiteful Visions (DSC) 233
1 Stoke the Flames (MOM) 166
1 Sulfurous Blast (CMM) 262
12 Swamp (MKM) 282
1 Terminate (M3C) 274
1 Terramorphic Expanse (DSK) 269
1 Viridian Longbow (MRD) 270
1 Vulshok Sorcerer (5DN) 80`;

const Login = lazy(() => import('./components/pages/Login'));

const queryClient = new QueryClient();

function AppContent() {
  const { sessionToken, handleLogin } = useAuth();

  if (!sessionToken) {
    return (
      <Suspense fallback={<Spinner />}>
        <Login onLogin={handleLogin} />
      </Suspense>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
      {/* <UploadDecklist /> */}
      {/* <DeckViewer deckText={deckText} /> */}
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <LeaderboardContextProvider>
        <AppContent />
      </LeaderboardContextProvider>
    </AuthContextProvider>
  );
}
