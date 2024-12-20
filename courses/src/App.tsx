import { Container } from 'react-bootstrap';
import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';
import { courseParts } from './data/courseParts';

const App = () => {
  const courseName = 'Half Stack application development';

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <Container>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total total={totalExercises} />
    </Container>
  );
};

export default App;
