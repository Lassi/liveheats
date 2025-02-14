'use client';

import { notFound } from 'next/navigation';
import { use, useCallback, useMemo, useState } from 'react';

import { ShowRaceBlock } from '@/blocks/show-race/show-race';
import { getRace } from '@/lib/race-utils';

export default function RacePage({ params }) {
  const raceId = use(params).raceId;

  const [refetch, setRefetch] = useState(0);
  const onCompleteSuccess = useCallback(() => {
    setRefetch((prevRefetch => prevRefetch + 1));
  });
  const race = useMemo(() => getRace(raceId), [refetch]);

  if (race == null) {
    notFound();
  }

  return (
    <ShowRaceBlock
      race={race}
      onCompleteSuccess={onCompleteSuccess}
    />
  );
}
