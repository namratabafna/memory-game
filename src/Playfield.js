import React, { useEffect, useState } from 'react'
import './Playfield.css'
import Card from './Card'
import spinner from './spinner.gif'
import {images_svg} from './assets/index'

const Playfield = ({ pairs }) => {
  const pairVisibleInMilliseconds = 1500
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const [missed, setMissed] = useState(0)
  const [pairsMatched, setPairsMatched] = useState(0)
  const [openedCards, setOpenedCards] = useState([])
  const [deck, setDeck] = useState([])
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false); 

  useEffect(() => {
    let interval = null;
    if(isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      
    }
    else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    
  }, [isActive, seconds]);

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  }

  const toggle = () => {
    setIsActive(!isActive);
  }  
  useEffect(() => {
    getImages()
  }, [pairs])

  useEffect(() => {
    if (images.length === pairs) {
      generateCards()
      setLoading(false)
      toggle()
    }
  }, [images])

  const openCard = (card) => {
    // Don't open the card if we already have 2 cards face up
    if (openedCards.length === 2) {
      return
    }

    let newDeck = [...deck]

    deck.forEach((element, index) => {
      if (element.number === card.number) {
        newDeck[index].open = true
        return
      }
    })

    setDeck(newDeck)

    let opened = openedCards
    opened.push(card)
    setOpenedCards(openedCards)

    if (opened.length === 2) {
      setTimeout(() => {
        handlePossibleMatch(opened)
      }, pairVisibleInMilliseconds)
    }
  }

  const handlePossibleMatch = (openedCards) => {
    let newDeck

    if (cardsMatch(openedCards)) {
      const openedCardNumbers = [openedCards[0].number, openedCards[1].number]
      newDeck = [...deck]

      deck.forEach((element, index) => {
        if (openedCardNumbers.includes(element.number)) {
          newDeck[index].open = false
          newDeck[index].matched = true
        }
      })

      setPairsMatched(pairsMatched + 1)
      setDeck(newDeck)
    } else {
      closeCards()
      setMissed(missed + 1)
    }

    
    setOpenedCards([])
  }

  const cardsMatch = (cards) => {
    return cards[0].pair === cards[1].pair
  }

  const getImages = async () => {
    let fetchedImages = []
    let count = 0
    while (fetchedImages.length < pairs) {     
      fetchedImages.push(images_svg[count++])
    }

    setImages(fetchedImages)
  }

  const closeCards = () => {
    let closedDeck = []

    deck.forEach((card) => {
      card.open = false
      closedDeck.push(card)
    })

    setDeck(closedDeck)
  }

  const resetGame = () => {
    reset()
    generateCards()
    setMissed(0)
    setPairsMatched(0)
  }

  const generateCards = () => {
    let cards = []
    let cardNumber = 0

    images.forEach((image, key) => {
      for (let i = 0; i < 2; i++) {
        cardNumber += 1

        cards.push({
          number: cardNumber,
          pair: key,
          image: image,
          open: false,
          matched: false
        })
      }
    })

    setDeck(shuffleDeck(cards))
  }

  const shuffleDeck = (cards) => {
    return cards
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1])
  }

  return (
    <div className={"playfield"}>
      { loading && (
        <div className="spinner">
          <div>
            <img src={spinner} />
          </div>
          <span>Loading game...</span>
        </div>
      )}

      {!loading && (
        <>
        <div className="center">
          { pairsMatched === pairs && (
              <button type="button" class="btn btn-info active mr-3" onClick={resetGame}>New game</button>
            )}
        </div>
            <div className="labelspacing font-weight-bold">
            <span>Error Score: {missed}</span>
            <span>Matches: {pairsMatched}</span>
            <span>Elapsed time: {seconds}</span>
            </div>
          { deck.map(card => {
              return <Card
                key={card.number}
                card={card}
                onCardOpen={openCard}
              />
            })
          }
        </>
      )}
    </div>
  )
}

export default Playfield
