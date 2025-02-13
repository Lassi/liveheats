'use client';

import { useRouter } from 'next/navigation'

import { Navbar, NavbarLogo } from '@/components/navbar/navbar';
import Link from 'next/link';

import { NewRaceBlock } from '@/blocks/new-race/new-race';

export default function NewRacePage() {
  const router = useRouter();
  return (
    <>
      <Navbar>
        <Link href="/">
          <NavbarLogo/>
        </Link>
      </Navbar>
      <main>
        <h1 className="text-4xl">Create a new race</h1>
        <NewRaceBlock />
        <button onClick={() => router.push('/races/fakeId')}>Create</button>
      </main>
    </>
  );
}
