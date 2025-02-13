'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';

import { ShowRaceBlock } from '@/blocks/show-race/show-race';
import { getRace } from '@/lib/race-utils';

export default function RacePage({ params }) {
  const raceId = use(params).raceId;
  const race = getRace(raceId);

  if (race == null) {
    notFound();
  }

  return (
    <ShowRaceBlock
      race={race}
    />
  );
}
