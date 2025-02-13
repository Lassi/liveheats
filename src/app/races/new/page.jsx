'use client';

import { useRouter } from 'next/navigation'

import { NewRaceBlock } from '@/blocks/new-race/new-race';

export default function NewRacePage() {
  const router = useRouter();

  return (
    <NewRaceBlock
      onCreateSuccess={() => {
        router.push('/races/fakeId')
      }}
    />
  );
}
