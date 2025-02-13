import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const NewRaceForm = () => {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);

  return (
    <div>
      <ul>
        {students.map((student) => (
          <li key={student}>{student}</li>
        ))}
      </ul>
      <div className="flex flex-row gap-2">
        <Input type="text" placeholder="Jane Doe" onChange={(event) => setStudentName(event.target.value)} value={studentName} />
        <Button onClick={() => {
          setStudents((prevStudents) => [...prevStudents, studentName]);
        }}>Add student</Button>
      </div>
    </div>
  );
};
