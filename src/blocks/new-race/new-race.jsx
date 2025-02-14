import { Navbar, NavbarLogo } from '@/components/navbar/navbar';
import Link from 'next/link';

import { NewRaceForm } from './components/new-race-form/new-race-form';

export const NewRaceBlock = ({ onCreateSuccess }) => {
  return (
    <>
      <Navbar>
        <Link href="/">
          <NavbarLogo/>
        </Link>
      </Navbar>
      <main className="px-8 py-4 flex flex-col">
        <div className="flex flex-col gap-8 md:self-center md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl">Create a new race</h1>
          <NewRaceForm onCreateSuccess={onCreateSuccess} />
        </div>
      </main>
    </>
  );
};
