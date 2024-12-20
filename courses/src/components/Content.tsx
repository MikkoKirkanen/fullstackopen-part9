import { useState } from 'react';
import { CoursePart } from '../types/CoursePart';
import Part from './Part';

interface ContentProps {
  courses: CoursePart[];
}

const Content = (props: ContentProps) => {
  const [courses] = useState<CoursePart[]>(props.courses);

  return (
    <div>
      {courses.map((cp) => (
        <Part key={cp.name} coursePart={cp} />
      ))}
    </div>
  );
};

export default Content;
