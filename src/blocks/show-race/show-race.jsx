import { Navbar, NavbarLogo } from '@/components/navbar/navbar';
import { Input } from "@/components/ui/input";
import Link from 'next/link';

export const ShowRaceBlock = ({ race }) => {
  return (
    <>
      <Navbar>
        <Link href="/">
          <NavbarLogo/>
        </Link>
      </Navbar>
      <main>
        {race.students.map(({ name }, index) => (
          <li key={`${name}-${index}`}>
            {name}
            <Input />
          </li>
        ))}
      </main>
    </>
  );
};
