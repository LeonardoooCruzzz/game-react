import React from 'react';
import ReactDOM from 'react-dom';
import './public/stylesheets/style.css';

function Square(props) {
  return (
    <button className="square" onClick={() =>
      props.onClick()
    }>
      {props.value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
  
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      jogador1: '',
      jogador2: '',
      limpar: false,
    };
    this.limpar = this.limpar.bind(this);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';;
    this.setState({
      squares: squares,
      limpar: true,
      xIsNext: !this.state.xIsNext,
    });
  }

  limpar(i) {
    this.setState({
      squares: Array(9).fill(null),
      limpar: false
    });
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }
  
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    let titulo;
    if (winner) {
      titulo = 'Ganhador:'
      if(this.state.jogador1 != '' && this.state.jogador2 != '') {
        status = winner == 'X' ? this.state.jogador1 : this.state.jogador2
      } else {
        status = winner == 'X' ? 'X' : 'O';
      } 
    } else {
      titulo = 'Próximo:'
      if(this.state.jogador1 != '' && this.state.jogador2 != '') {
        status = this.state.xIsNext ? this.state.jogador1 : this.state.jogador2;
      }  else {
        status = this.state.xIsNext ? 'X' : 'O';
     
      }
    }
    return (
        <div className="jogo">
          <div className="jogador"><strong>{titulo}</strong> {status}</div>
          <div className="tabuleiro">
            <div className="board-row box-1">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row box-2">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row box-3">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
          <form method="post" onSubmit={this.enviarForm}>
            <div className="input">
              <input type="text" name="jogador_1" onInput={(e) => this.setState({jogador1: e.target.value})} placeholder="Nome Jogador 1"/>
            </div>
            <div className="input">
              <input type="text" name="jogador_1" onInput={(e) => this.setState({jogador2: e.target.value})}  placeholder="Nome Jogador 2" />
            </div>
            <div className="button">
              <div className={"limpar " + (this.state.limpar == false ? "not" : '') } onClick={this.limpar}>Reiniciar</div>
            </div>
          </form>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <h1>Jogo Da Velha</h1>
          <Board />
        </div>
      );
    }
  }
  
  // ========================================
  
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  