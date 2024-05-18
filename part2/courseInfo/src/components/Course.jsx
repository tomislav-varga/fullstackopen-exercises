const Header = (props) => {
    return (
      <>
            <h1>{props.course}</h1></>
    )
  }
  
const Part = (props) => {
return (
    <>
        <p>{props.name} {props.exercises}</p>
    </>
)
}
  
const Content = (props) => {
    return (
        <div>
            {props.parts.map((part) => (
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            ))}
        </div>
    )
}
const Course = ( {course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course