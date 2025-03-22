import React from 'react'

function CardListItem(props) {
  return (
        <div className="card-list-item">
          <div className="card-list-item-text">
            <p>{props.front}</p>
          </div>
          <div className="card-list-item-text">
            <p>{props.back}</p>
          </div>
        </div>
  )
}

export default CardListItem