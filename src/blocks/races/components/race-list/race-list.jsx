import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export const RaceList = ({ children }) => {
  return (
    <ul>
      {children}
    </ul>
  );
};

export const RaceListItem = ({ id, name, numberOfStudents }) => {
  return (
    <li>
      <Link href={`/races/${id}`}>
        <div className="py-4 border-b flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">{name}</h2>
            <p className="text-foreground/70 text-md">{`${numberOfStudents} students`}</p>
          </div>
          <ChevronRightIcon className="font-semibold size-6 stroke-2" />
        </div>
      </Link>
    </li>
  );
};
