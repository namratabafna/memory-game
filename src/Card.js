import React from 'react'
import './Card.css'
import preview from './assets/index.js'

const Card = ({ card, onCardOpen }) => {

  const clickHandler = () => {
    if (!card.open && !card.matched) {
      onCardOpen(card)
    }
  }

  const getCard = () => {
    if (card.matched) {
      return
    } else if (card.open) {
      return <img src={card.image} alt="Memory"/>
    }

    return <img src={preview} alt="*" className="not-opened"></img>
  }

  return (
    <div className={"card" + (card.matched ? " matched" : "")} onClick={clickHandler}>
      {getCard()}
    </div>
  )
}

export default Card
