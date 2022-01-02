import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/css.png", matched: false},
  {"src": "/img/html.png", matched: false},
  {"src": "/img/js.png", matched: false},
  {"src": "/img/laravel.png", matched: false},
  {"src": "/img/react.png", matched: false},
  {"src": "/img/vue.png", matched: false},
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCard = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices & increse turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns(prevTurns => prevTurns + 1)
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCard()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={ shuffleCard }>New Game</button>

      <div className="card-grid">
        {cards.map(card => 
          <SingleCard
            handleChoice={ handleChoice }
            flipped={ card === choiceOne || card === choiceTwo || card.matched }
            key={ card.id }
            card={ card }
            disabled={disabled}
          />
        )}
      </div>
      <p>Turno: { turns }</p>
    </div>
  );
}

export default App;
