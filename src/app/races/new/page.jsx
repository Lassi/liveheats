'use client';

import { useRouter } from 'next/navigation'

export default function NewRacePage() {
  const router = useRouter();
  return (
    <main>
      <h1>Create a new race</h1>
      <button onClick={() => router.push('/races/fakeId')}>Create</button>
    </main>
  );
}
