import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hands: undefined
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          {this.state.hands === undefined
            ? this.renderStartScreen()
            : this.renderGame()
          }
        </div>
      </div>
    );
  }

  renderStartScreen() {
    return (
      <div>
        <img src={"https://78.media.tumblr.com/89f6c2888dea968f9cb4bbc6ef581b82/tumblr_oz5tuoF2er1tgo74ho1_1280.gif"} height={600} width={600} />
        <div>
          <button className="App-title" onClick={this.handleLetsPlayClick}>Lets Play A Game</button>
        </div>
      </div>
    )
  }

  renderGame() {
    return (
      <div>
        <div>
          <div>Dealer</div>
          <div>{this.renderHand(this.state.hands.dealer)}</div>
        </div>
        <br />
        <div>
          <div>Player</div>
          <div>{this.renderHand(this.state.hands.player)}</div>
        </div>


      </div>
    )
  }

  renderHand(hand) {
    return (
      <div>
        <div>
          <span>Points: </span>
          <span>{hand.points}</span>
        </div>
        {hand.cards.map((card) => (
          <span className="card">{card.cardName}</span>
        ))}
      </div>
    );
  }

  handleLetsPlayClick = () => {
    fetch("http://localhost:8080/startGame").then((response) => {
      return response.json()
    }).then((response) => {
      this.setState({
        hands: response
      })
    })
  }
}

export default App;
