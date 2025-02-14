import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/lib/student-utils';

export const StudentList = ({ children }) => {
  return (
    <div className="grid grid-cols-6 gap-y-4 items-center">
      <div className="contents">
        <h2 className="font-semibold col-span-1">Lane</h2>
        <h2 className="font-semibold col-span-5">Student</h2>
      </div>
      <ul className="contents">
        {children}
      </ul>
    </div>
  );
};

export const StudentListItem = ({ name, lane }) => {
  return (
    <li className="contents">
      <div className="contents">
          <div className="semibold">{lane}</div>
          <div className="col-span-5 flex flex-row items-center gap-4">
            <Avatar>
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            {name}
          </div>
      </div>
    </li>
  );
};
