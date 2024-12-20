interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => <p>Number of exercises {props.total}</p>;

export default Total;
