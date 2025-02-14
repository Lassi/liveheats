import Link from 'next/link';
import { useState } from 'react';

import { Navbar, NavbarLogo } from '@/components/navbar/navbar';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { validateRanking } from '@/lib/ranking-utils';
import { completeRace, isLive } from '@/lib/race-utils';
import {
  UnrankedStudentList,
  UnrankedStudentListItem,
} from './components/unranked-student-list/unranked-student-list';


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
      <main className="px-8 py-4 flex flex-col">
        <div className="flex flex-col gap-8 md:self-center md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl">Race results</h1>
          {isLive(race) ? (
            <>
              <UnrankedStudentList>
                {race.students.map(({ name }, studentIndex) => (
                  <UnrankedStudentListItem
                    key={`${name}-${studentIndex}`}
                    name={name}
                    lane={studentIndex + 1}
                    rank={ranks.at(studentIndex)}
                    onChangeRank={(event) => {
                      setRanks((prevRanks) => {
                        return [
                          ...prevRanks.slice(0, studentIndex),
                          event.target.value,
                          ...prevRanks.slice(studentIndex + 1),
                        ];
                      });
                    }}
                  />
                ))}
              </UnrankedStudentList>
              {error && !isEmpty && (
                <p className="text-red-500 self-center">Error: {error}</p>
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
        </div>
      </main>
    </>
  );
};
