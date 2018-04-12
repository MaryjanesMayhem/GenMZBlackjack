const express = require('express')
const Deck = require('card-deck')

let game = {}

const app = express()

app.get('/startGame', 
    (req, res) => {
      game = createGame()
      addCard(game.Player, game.Deck.draw(1))
      addCard(game.Dealer, game.Deck.draw(1))
      const returnValue = {
        dealer: game.Dealer,
        player: game.Player
      }
      res.json(returnValue)
    }
)

app.listen(8080, () => console.log('Example app listening on port 8080!'))
function createCards(suit) {
  return [
    {
      cardName: `${suit}a`,
      value:11,
      isAce:true
    },
    {
      cardName: `${suit}2`,
      value:2,
      isAce:false
    },
    {
      cardName: `${suit}3`,
      value:3,
      isAce:false
    },
    {
      cardName: `${suit}4`,
      value:4,
      isAce:false
    },
    {
      cardName: `${suit}5`,
      value:5,
      isAce:false
    },
    {
      cardName: `${suit}6`,
      value:6,
      isAce:false
    },
    {
      cardName: `${suit}7`,
      value:7,
      isAce:false
    },
    {
      cardName: `${suit}8`,
      value:8,
      isAce:false
    },
    {
      cardName: `${suit}9`,
      value:9,
      isAce:false
    },
    {
      cardName: `${suit}10`,
      value:10,
      isAce:false
    },
    {
      cardName: `${suit}j`,
      value:10,
      isAce:false
    },
    {
      cardName: `${suit}q`,
      value:10,
      isAce:false
    },{
      cardName: `${suit}k`,
      value:10,
      isAce:false
    }
   
  ]}
function createDeck(){
  return new Deck([
    ...createCards("h"),
    ...createCards("d"),
    ...createCards("s"),
    ...createCards("c"),
  ]
  );
}
function createGame (){
  const deck = createDeck()
  deck.shuffle()
  return {
    Deck: deck,
    Dealer: {
        cards: [],
        points: 0,
        numAces: 0
    },
    Player: {
        cards: [],
        points: 0,
        numAces: 0
    }
  }
} 

function addCard(hand, card) {
  hand.cards.push(card)
  hand.points += card.value
  if (card.isAce)
      hand.numAces++
  if (hand.points > 21 && hand.numAces > 0){
    hand.points = hand.points - 10
    hand.numAces--
  }
}