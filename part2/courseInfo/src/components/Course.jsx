const Header = (props) => {
    return (
      <>
            <h1>{props.course}</h1></>
    )
  }
  
const Part = (props) => {
return (
    <>
        <p>{props.part} {props.exercises}</p>
    </>
)
}
  
const Content = (props) => {
    return (
        <div>
            {props.parts.map((part, index) => (
                <Part key={index} part={part.name} exercises={part.exercises} />
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