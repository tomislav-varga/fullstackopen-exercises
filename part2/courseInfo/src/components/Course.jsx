const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
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

const Total = (props) => {
    return (
        <>
            <h3>Number of exercises {props.parts.reduce((sum, part) => sum + part.exercises, 0)}</h3>
        </>
    )
}

const Course = ( {course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course