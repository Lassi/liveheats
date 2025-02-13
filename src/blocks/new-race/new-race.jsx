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
      <main>
        <h1 className="text-4xl">Create a new race</h1>
        <NewRaceForm onCreateSuccess={onCreateSuccess} />
      </main>
    </>
  );
};
