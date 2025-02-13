import { useState } from 'react';
import { v4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LOCALSTORAGE_KEY } from '@/lib/constants';

export const NewRaceForm = ({ onCreateSuccess }) => {
  const [studentName, setStudentName] = useState('');
  const [studentNames, setStudentNames] = useState([]);

  return (
    <div>
      <ul>
        {studentNames.map((student) => (
          <li key={student}>{student}</li>
        ))}
      </ul>
      <div className="flex flex-row gap-2">
        <Input type="text" placeholder="Jane Doe" onChange={(event) => setStudentName(event.target.value)} value={studentName} />
        <Button onClick={() => {
          setStudentNames((prevStudents) => [...prevStudents, studentName]);
          setStudentName('');
        }}>Add student</Button>
      </div>
      <Button
        onClick={() => {
          const race = {
            id: v4(),
            students: studentNames.map(name => ({ name })),
          };
          localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify([race]));
          onCreateSuccess?.(race.id);
        }}
      >
        Create race
      </Button>
    </div>
  );
};
