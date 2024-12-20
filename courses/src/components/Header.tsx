interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => <h1>{props.name}</h1>;

export default Header;
