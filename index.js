import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//клетка
// при объявленрии конструктора нужно всегда вызывать супер
function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>

  );
}
  
  // поле
  class Board extends React.Component {
    renderSquare(i) {
      return ( <Square value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />
      ); 
    } // передаем данные из компонента поле в клетку.

    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      }
    }

    handleClick(i){
      const history= this.state.history.slice(0, this.state.stepNumber+1);
      const current = history[history.length-1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]){
        return;
      }
        
        squares[i] = this.state.xIsNext ? 'X' : '0';
        this.setState({
          history: history.concat([
            {
              squares: squares,
            }
          ]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step%2) === 0
      })
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ? 
        'Passo #' + move :
        'Início do Jogo';
        return(
          <li className="lista" key={move}> 
            <button className="resultados" onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });// para cada passo é criado um li que tem um btn. ao clicarmos vai chamar o metodo this.jumpTo

      let status;
      if(winner){
        status = "Ganhou " + winner; 
      }else{
        status = "Próximo passo " + (this.state.xIsNext ? 'X' : '0');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares}
            onClick={i => this.handleClick(i)}
            
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }


  function calculateWinner(squares){
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
    for(let i = 0; i<lines.length; i++){
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }


  
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  