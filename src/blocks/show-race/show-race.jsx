import Link from 'next/link';
import { useState } from 'react';

import { Navbar, NavbarLogo } from '@/components/navbar/navbar';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { validateRanking } from '@/lib/ranking-utils';


export const ShowRaceBlock = ({ race }) => {
  const [ranks, setRanks] = useState(new Array(race.students.length).fill(''));
  const isEmpty = ranks.every(rank => rank === '');
  const { valid: isRankingValid, error } = validateRanking(ranks, race.students.length);

  return (
    <>
      <Navbar>
        <Link href="/">
          <NavbarLogo/>
        </Link>
      </Navbar>
      <main>
        <ul>
        {race.students.map(({ name }, studentIndex) => (
          <li key={`${name}-${studentIndex}`}>
            {name}
            <Input
              onChange={(event) => {
                setRanks((prevRanks) => {
                  return [
                    ...prevRanks.slice(0, studentIndex),
                    event.target.value,
                    ...prevRanks.slice(studentIndex + 1),
                  ];
                });
              }}
              value={ranks.at(studentIndex) ?? ''}
            />
          </li>
        ))}
        </ul>
        {error && !isEmpty && (
          <p>Error: {error}</p>
        )}
        <Button
          disabled={!isRankingValid}
          onClick={() => {

          }}
        >
          Complete race
        </Button>
      </main>
    </>
  );
};
