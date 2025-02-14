import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from "@/components/ui/input";
import { getInitials } from '@/lib/student-utils';

export const UnrankedStudentList = ({ children }) => {
  return (
    <div className="grid grid-cols-6 gap-y-4 items-center">
      <div className="contents">
        <h2 className="font-semibold col-span-1">Lane</h2>
        <h2 className="font-semibold col-span-4">Student</h2>
        <h2 className="font-semibold col-span-1">Rank</h2>
      </div>
      <ul className="contents">
        {children}
      </ul>
    </div>
  );
};

export const UnrankedStudentListItem = ({ name, lane, rank, onChangeRank }) => {
  return (
    <li className="contents">
      <div className="contents">
          <div className="semibold">{lane}</div>
          <div className="col-span-4 flex flex-row items-center gap-4">
            <Avatar>
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            {name}
          </div>
          <Input
            // data-test-id={`${name}-${studentIndex}`}
            type="text"
            onChange={onChangeRank}
            value={rank}
          />
      </div>
    </li>
  );
};
