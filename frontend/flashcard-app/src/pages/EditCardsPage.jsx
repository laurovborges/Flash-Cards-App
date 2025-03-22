import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import EditCardListItem from '../components/EditCardListItem'

function EditCardsPage() {
    const [addCardBtnText, setAddCardBtnText] = useState('Add')
    const { deckID } = useParams()
    const [cards, setCards] = useState([])
    const [deckName, setDeckName] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')

    const getDeckName = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const response = await axios.get(`http://localhost:3000/api/v1/decks/${deckID}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setDeckName(response.data.name)
        } catch (error) {
            console.log(error)
        }
    }

    async function addCard(formData) {
        const accessToken = localStorage.getItem('accessToken')
        const front = formData.get("card-front")
        const back = formData.get("card-back")
        setAddCardBtnText('Adding card...')

        try {
            const response = await axios.post(`http://localhost:3000/api/v1/decks/${deckID}/cards`, { front, back }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setCards(prev => [response.data, ...prev])
            setAddCardBtnText('Add')

        } catch (error) {
            console.log(error)
            // setErrorMsg((error.response ? error.response.data.msg : null) || error.message)
            setAddCardBtnText('Something went wrong.')
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

            setCards(response.data.reverse())

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

    console.log(cards)

    return (
        <>
            <Link className="back-btn" to={`/decks/${deckID}/cards`}>Back</Link>
            <h1 className="deck-title">{deckName}</h1>
            <div className="add-cards-container">
                <form action={addCard}>
                    <div>
                        <label htmlFor="card-front">Front</label>
                        <textarea
                        name="card-front"
                        id="card-front"
                        required={true}></textarea>
                    </div>
                    <div>
                        <label htmlFor="card-back">Back</label>
                        <textarea
                        name="card-back"
                        id="card-back"
                        required={true}></textarea>
                        </div>
                    <button>{addCardBtnText}</button>
                </form>
            </div>
            {cards.length > 0 ? cards.map(card => <EditCardListItem key={card._id} cardID={card._id} deckID={card.deck} front={card.front} back={card.back} fetchCards={fetchCards} />) : (<p className="no-cards-msg">No cards in this deck yet</p>)}
        </>
    )
}

export default EditCardsPage