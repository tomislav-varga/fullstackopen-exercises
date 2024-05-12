import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <p>{text} {value}</p>
    </>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  /// ...
  return(
    <div>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={average.toFixed(2)} />
      <StatisticLine text="positive" value ={positive.toFixed(2)} />
  
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = (good *1 + neutral * 0 + bad * -1) / (good + neutral + bad)
  const positive = (good / (good + neutral + bad)) * 100
  const all = good + neutral + bad

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <h1>Statistics</h1>
      {
      all > 0? <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} /> 
      : <p>No feedback given</p>
      }
    </div>
  )
}

export default App
