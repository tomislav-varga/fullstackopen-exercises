interface CourseNameProps {
  name: string;
}

const Header = ( props: CourseNameProps ) => {
  return <h1>{props.name}</h1>;
};

export default Header;
