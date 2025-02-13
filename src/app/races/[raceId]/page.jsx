import { notFound } from 'next/navigation';

import { ShowRaceBlock } from '@/blocks/show-race/show-race';

export default function RacePage() {
  notFound();

  return (
    <main>
      <h1>Temporary race page</h1>
      <ShowRaceBlock />
    </main>
  );
}
