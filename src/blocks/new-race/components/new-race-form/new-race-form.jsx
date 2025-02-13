import { useState } from 'react';
import { v4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createRace } from '@/lib/race-utils';

export const NewRaceForm = ({ onCreateSuccess }) => {
  const [newStudentName, setNewStudentName] = useState('');
  const [studentNames, setStudentNames] = useState([]);
  const isNewStudentNameValid =
    newStudentName !== '' &&
    studentNames.every(
      (studentName) => studentName !== newStudentName
    )
  ;
  const hasEnoughStudents = studentNames.length >= 2;

  return (
    <div>
      <ul>
        {studentNames.map((student) => (
          <li key={student}>{student}</li>
        ))}
      </ul>
      <div className="flex flex-row gap-2">
        <Input
          type="text"
          placeholder="Jane Doe"
          onChange={(event) => {
            setNewStudentName(event.target.value);
          }}
          value={newStudentName}
        />
        <Button
          disabled={!isNewStudentNameValid}
          onClick={() => {
            setStudentNames((prevStudents) => [
              ...prevStudents,
              newStudentName,
            ]);
            setNewStudentName('');
          }}
        >
          Add student
        </Button>
      </div>
      <Button
        disabled={!hasEnoughStudents}
        onClick={() => {
          const newRace = createRace(studentNames);
          onCreateSuccess?.(newRace.id);
        }}
      >
        Create race
      </Button>
    </div>
  );
};
