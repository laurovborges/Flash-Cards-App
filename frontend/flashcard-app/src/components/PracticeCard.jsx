import React from 'react'
import {useState, useEffect} from 'react'

function PracticeCard(props) {
  const {front, back} = props
  const [isFront, setIsFront] = useState(true) // true = front, false = back  

  useEffect(() => {
    setIsFront(true)
  }, [props])

  return (
    <button className="practice-card" onClick={() => setIsFront(!isFront)}>
        <p className="practice-card-index">{props.cardNum + 1} / {props.numCards}</p>
        {isFront ? <p className="card-side-label">Front</p> : <p className="card-side-label">Back</p>}
        {isFront ? <p>{front}</p> : <p>{back}</p>}
    </button>
  )
}

export default PracticeCard