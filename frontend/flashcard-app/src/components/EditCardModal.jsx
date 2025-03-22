import React, { useState } from 'react'
import axios from 'axios'

function EditCardModal(props) {
    const [frontText, setFrontText] = useState(props.frontText)
    const [backText, setBackText] = useState(props.backText)

    async function editCard() {
        const accessToken = localStorage.getItem('accessToken')

        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/decks/${props.deckID}/cards/${props.cardID}`, {front: frontText, back: backText}, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
            await props.fetchCards()
            props.toggleEditCardModal()
          } catch (error) {
            console.log(error)
            // setErrorMsg((error.response ? error.response.data.msg : null) || error.message)
        }
    }

    function handleFrontChange(event){
        const {value} = event.currentTarget
        setFrontText(value)
    }

    function handleBackChange(event){
        const {value} = event.currentTarget
        setBackText(value)
    }

    return (
        <div className="edit-card-modal-container">
            <div className="gray-overlay" onClick={props.toggleEditCardModal}></div>
            <div className="edit-card-modal">
                <h1>Edit Card</h1>
                <form action={editCard}>
                    <div>
                        <label htmlFor="edit-card-front">Front</label>
                        <textarea
                            onChange={handleFrontChange}
                            value={frontText}
                            type="text"
                            name="edit-card-front"
                            id="edit-card-front">
                        </textarea>
                    </div>
                    <div>
                    <label htmlFor="edit-card-back">Back</label>
                    <textarea
                        onChange={handleBackChange}
                        value={backText}
                        type="text"
                        name="edit-card-back"
                        id="edit-card-back">
                    </textarea>
                    </div>
                    <button className="edit-card-save-btn">Save</button>
                    <button className="edit-card-cancel-btn" onClick={props.toggleEditCardModal}>Cancel</button>
                </form>
            </div>
        </div>
  )
}

export default EditCardModal