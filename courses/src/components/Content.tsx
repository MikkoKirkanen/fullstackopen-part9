import { useState } from 'react';

interface ContentProps {
  courses: CoursePart[];
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = (props: ContentProps) => {
  const [courses] = useState<CoursePart[]>(props.courses);

  return (
    <div>
      {courses.map((c) => (
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
