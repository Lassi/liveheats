import Link from 'next/link';

import { Navbar, NavbarLogo } from '@/components/navbar/navbar';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import { RaceList, RaceListItem } from './components/race-list/race-list';

export const RacesBlock = ({ liveRaces, completedRaces }) => {
  return (
    <>
      <Navbar>
        <NavbarLogo/>
        <Button asChild>
          <Link href="/races/new">Create new race</Link>
        </Button>
      </Navbar>
      <main className="px-8 py-4">
        <h1 className="text-4xl">All your races</h1>
        <Tabs className="md:w-1/2" defaultValue="live">
          <TabsList className="grid sm:w-1/2 md:w-1/3 lg:w-1/4 grid-cols-2">
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="live">
            <RaceList>
              {liveRaces.map((race) => (
                <RaceListItem key={race.id} id={race.id} name={race.name} numberOfStudents={race.students.length}/>
              ))}
            </RaceList>
          </TabsContent>
          <TabsContent value="completed">
            <RaceList>
              {completedRaces.map((race) => (
                <RaceListItem key={race.id} id={race.id} name={race.name} numberOfStudents={race.students.length}/>
              ))}
            </RaceList>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};
