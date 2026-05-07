import { useState } from 'react'
import './App.css'

const Button = (props) => {
  return (
    <button 
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
  return (
    <div>
      {props.label}: {props.value}
    </div>
  )
}

const Statistics = ({ buy, hold, sell }) => {
  if ((buy + hold + sell) === 0) {
    return (
      <div>
        <h2>No Analysts has voted on this stock yet</h2>
      </div>
    )
  }
  
  return (
    <div>
      <h2>{buy + hold + sell} Analysts Ratings</h2>

      <StatisticsLine label="Buy" value={buy} />
      <StatisticsLine label="Hold" value={hold} />
      <StatisticsLine label="Sell" value={sell} />
    </div>
  )
}

const App = () => {
  const [buy, setBuy] = useState(0)
  const [hold, setHold] = useState(0)
  const [sell, setSell] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleBuyVote = () => {
    setBuy(buy + 1)
  }

  const handleHoldVote = () => {
    setHold(hold + 1)
  }
  
  const handleSellVote = () => {
    setSell(sell + 1)
  }

  return (
    <div>
      <h1>What Analysts say about $TICKER</h1>
      <div>
        <Button onClick={handleBuyVote} text='Buy' />
        <Button onClick={handleHoldVote} text='Hold' />
        <Button onClick={handleSellVote} text='Sell' />
      </div>

      <Statistics
        buy = {buy}
        hold = {hold}
        sell = {sell}
      />
    </div>
  )
}

export default App