'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';

import { ShowRaceBlock } from '@/blocks/show-race/show-race';
import { useRace } from '@/blocks/show-race/hooks/use-race';

export default function RacePage({ params }) {
  const raceId = use(params).raceId;
  const race = useRace(raceId);

  if (race == null) {
    notFound();
  }

  return (
    <main>
      <h1>Temporary race page</h1>
      <ShowRaceBlock race={race}/>
    </main>
  );
}
