import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const calculateWinner = (squares: string[]): string | null => {
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


type Input = "☦" | "🔵" | null;
type Squares = Input[];

// Game ///////////////////////////////////////////////////////
interface IGameState {
    history: [{squares: Squares}],
    xIsNext: boolean;
}

class Game extends React.Component<{}, IGameState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };

    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={Array(9).fill("")}/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}


// Board ///////////////////////////////////////////////////////
interface BoardPropsInterface {
    squares: string[];
}

interface BoardStateInterface {
    squares: string[];
    xIsNext: boolean;
}

class Board extends React.Component<BoardPropsInterface, BoardStateInterface> {
    constructor(props: BoardPropsInterface) {
        super(props);
        this.state = {
            "squares": Array(9).fill(""),
            "xIsNext": true
        }
    }

    renderSquare(i: number) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    }

    handleClick(i: number) {
        if (calculateWinner(this.state.squares) || this.state.squares[i]) {
            return;
        }
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? '☦' : '🔵';

        this.setState({squares: squares, xIsNext: !this.state.xIsNext});
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? "☦" : "🔵"}`;
        }


        return (
            <div>
                <div className="status">{status}</div>
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


// Square //////////////////////////////////////////////////////////////
interface SquarePropsInterface {
    value: string
    onClick: () => void
}


const Square: React.VFC<SquarePropsInterface> = (props: SquarePropsInterface) => {
    return (
        <>
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        </>
    );
}


// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

