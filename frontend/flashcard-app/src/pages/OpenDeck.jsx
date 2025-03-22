import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CardListItem from '../components/CardListItem'
import PracticeCard from '../components/PracticeCard'
// TODO: show number of cards
function OpenDeck() {
  const {deckID} = useParams()
  const [cards, setCards] = useState([])
  const [cardNum, setCardNum] = useState(0)
  const [errorMsg, setErrorMsg] = useState('No cards in this deck. Go ahead and add some!')
  const [isLoading, setIsLoading] = useState(true)
  const [deckName, setDeckName] = useState('')

  const getDeckName = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const response = await axios.get(`http://localhost:3000/api/v1/decks/${deckID}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      setDeckName(response.data.name)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCards = async () => {
    try {
      setIsLoading(true)
      const accessToken = localStorage.getItem('accessToken')
      const response = await axios.get(`http://localhost:3000/api/v1/decks/${deckID}/cards`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

        setCards(response.data)

      } catch (error) {
        console.log(error)
        setErrorMsg((error.response ? error.response.data.msg : null) || error.message)
      } finally {
        setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCards();
    getDeckName();
  }, [])


  function nextCard() {
    if(cardNum < cards.length - 1){
        setCardNum(cardNum + 1)
    }
    else {
        setCardNum(0)
    }
  }
  function prevCard() {
    if(cardNum > 0){
        setCardNum(cardNum - 1)
    }
  }

  function shuffleCards() {
    const shuffledCards = [...cards]
    for(let i = cards.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCardNum(0)
    setCards(shuffledCards)
  }
    
  if (isLoading) {
      return <div>Loading...</div>
  }

  return (
      <>  
          <Link className="back-btn" to='/dashboard'>Back</Link>
          <h1 className="deck-title">{deckName}</h1>
          <div className="deck-option-buttons-container">
            <Link to={`/decks/${deckID}/cards/edit`}>Edit Deck</Link>
            {cards.length > 0 &&
              <button onClick={shuffleCards}>Shuffle</button>
            }
          </div>
          {cards.length > 0 &&
          <div className="practice-cards-container">
            <PracticeCard front={cards[cardNum]?.front} back={cards[cardNum]?.back} numCards={cards.length} cardNum={cardNum}/>
            <div className="next-prev-buttons">
                <button onClick={prevCard}>&lt; Prev</button>
                <button onClick={nextCard}>Next &gt;</button>
            </div>
          </div>}
          {cards.length > 0 ? <h1 className="cards-length">{cards.length} cards</h1> : null}
          {cards.length > 0 ? cards.map(card => <CardListItem key={card._id} front={card.front} back={card.back} />) : (<p className="message-box">{errorMsg}</p>)}
      </>
  )
}

export default OpenDeck