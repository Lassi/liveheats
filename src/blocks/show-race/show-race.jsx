import Link from 'next/link';
import { useState } from 'react';

import { Navbar, NavbarLogo } from '@/components/navbar/navbar';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { validateRanking } from '@/lib/ranking-utils';
import { completeRace, isLive } from '@/lib/race-utils';


export const ShowRaceBlock = ({ race, onCompleteSuccess }) => {
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
        {isLive(race) ? (
          <>
            <ul>
              {race.students.map(({ name }, studentIndex) => (
                <li key={`${name}-${studentIndex}`}>
                  {name}
                  <Input
                    id={`${name}-${studentIndex}`}
                    data-test-id={`${name}-${studentIndex}`}
                    type="text"
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
                const integerRanks = ranks.map(rank => parseInt(rank, 10));
                completeRace(race.id, integerRanks);
                onCompleteSuccess?.();
              }}
            >
              Complete race
            </Button>
          </>
        ) : (
          <ul>
            {race.students.map(({ name }, studentIndex) => (
              <li key={`${name}-${studentIndex}`}>
                {name}
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};
