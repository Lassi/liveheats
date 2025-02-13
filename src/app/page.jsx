'use client';

import { RacesBlock } from '@/blocks/races/races';
import { listRaces } from '@/lib/race-utils';

export default function RootPage() {
  const { liveRaces, completedRaces } = listRaces();

  return (
    <RacesBlock
      liveRaces={liveRaces}
      completedRaces={completedRaces}
    />
  );
}
