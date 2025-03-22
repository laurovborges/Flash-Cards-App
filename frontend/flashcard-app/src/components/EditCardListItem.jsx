import React, {useState} from 'react'
import axios from 'axios'
import EditCardModal from './EditCardModal'

function EditCardListItem(props) {
  const [showEditCardModal, setShowEditCardModal] = useState(false)

  async function deleteCard() {
    const accessToken = localStorage.getItem('accessToken')
    try {
      const response = await axios.delete(`https://flash-cards-app-backend.onrender.com/api/v1/decks/${props.deckID}/cards/${props.cardID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      props.fetchCards()
    } catch (error) {
      console.log(error)
      // setErrorMsg((error.response ? error.response.data.msg : null) || error.message)
    }
  }

  function toggleEditCardModal() {
    setShowEditCardModal(prev => !prev)
  }

  return (
    <div className="card-list-item">
      <div className="edit-card-buttons-container">
        <button className="delete-card-btn" onClick={deleteCard}>Delete</button>
        <button className="edit-card-btn" onClick={toggleEditCardModal}>Edit</button>
      </div>
      <div className="card-list-item-text">
        <p>{props.front}</p>
      </div>
      <div className="card-list-item-text">
        <p>{props.back}</p>
      </div>
      {showEditCardModal &&
        <EditCardModal deckID={props.deckID} cardID={props.cardID} frontText={props.front} backText={props.back} toggleEditCardModal={toggleEditCardModal} fetchCards={props.fetchCards}/>
      }
    </div>
  )
}

export default EditCardListItem