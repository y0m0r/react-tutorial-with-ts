import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const calculateWinner = (squares: Squares): string | null => {
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
    history: { squares: Squares }[],
    xIsNext: boolean;
    stepNumber: number;
}

class Game extends React.Component<{}, IGameState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });


        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i: number) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? '☦' : '🔵';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });

    }

}


// Board ///////////////////////////////////////////////////////
interface IBoardProps {
    squares: Squares;
    onClick: (i: number) => void;
}

const Board: React.VFC<IBoardProps> = (props: IBoardProps) => {

    const renderSquare = (i: number) => {
        return <Square value={props.squares[i]} onClick={() => props.onClick(i)}/>;
    }

    return (
        <>
            <div>
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
        </>

    )

}


// Square //////////////////////////////////////////////////////////////
interface SquarePropsInterface {
    value: Input
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

