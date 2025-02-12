'use client';

import { useRaces } from '@/blocks/races/hooks/use-races';
import { RacesBlock } from '@/blocks/races/races';

export default function RootPage() {
  const { liveRaces, completedRaces } = useRaces();

  return (
    <RacesBlock
      liveRaces={liveRaces}
      completedRaces={completedRaces}
    />
  );
}
