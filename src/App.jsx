import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
};

const getTokenForPlayer = player => {
  return player === 0 ? PLAYER_1 : PLAYER_2;
};

const countPlayedTokens = (board) => {
  let count = 0;
  for (const row of board) {
    for (const space of row) {
      if (space.value !== '') {
        count += 1;
      }
    }
  }

  return count;
};

const getCurrentPlayer = (board) => {
  return countPlayedTokens(board) % 2;
};

const isDraw = (board) => {
  return countPlayedTokens(board) === board.length ** 2 && !checkForWinner(board);
};

const checkForWinner = (board) => {
  // rows
  for (let i = 0; i < board.length; i += 1) {
    if (board[i][0].value !== '' && board[i][0].value === board[i][1].value
      && board[i][1].value === board[i][2].value) {
      return board[i][0].value;
    }
  }

  // cols
  for (let i = 0; i < board.length; i += 1) {
    if (board[0][i].value !== '' && board[0][i].value === board[1][i].value
      && board[1][i].value === board[2][i].value) {
      return board[0][i].value;
    }
  }

  // major diag
  if (board[1][1].value !== ''
    && board[0][0].value === board[1][1].value
    && board[1][1].value === board[2][2].value) {
    return board[1][1].value;
  }

  // major diag
  if (board[1][1].value !== ''
    && board[0][2].value === board[1][1].value
    && board[1][1].value === board[2][0].value) {
    return board[1][1].value;
  }

  return null;
};

const WINNING_MOVES = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

// const checkForWinner = (board) => {
//   for (const path of WINNING_MOVES) {
//     const first = path[0];
//     const token = board[first[0]][first[1]];
//     if (token.value === '') {
//       continue;
//     }

//     let count = 0;
//     for (const cell of path) {
//       const compare = board[cell[0]][cell[1]];
//       if (compare.value === token.value) {
//         count += 1;
//       }
//     }

//     if (count === path.length) {
//       return token.value;
//     }
//   }

//   return null;
// };

// const checkForWinner = (board) => {
//   // Complete in Wave 3
//   // You will need to:
//   // 1. Go across each row to see if
//   //    3 squares in the same row match
//   //    i.e. same value
//   // 2. Go down each column to see if
//   //    3 squares in each column match
//   // 3. Go across each diagonal to see if
//   //    all three squares have the same value.

//   // rows
//   for (let i = 0; i < board.length; i += 1) {
//     const row = board[i];
//     const token = row[0];
//     if (token.value === '') { continue; }

//     let count = 1;
//     for (let j = 1; j < row.length; j += 1) {
//       if (token.value === row[j].value) {
//         count += 1;
//       }
//     }

//     if (count === row.length) {
//       return token.value;
//     }
//   }


//   // cols
//   const row = board[0];
//   for (let i = 0; i < row.length; i += 1) {
//     const token = row[i];
//     if (token.value === '') { continue; }

//     let count = 1;
//     for (let j = 1; j < board.length; j += 1) {
//       if (token.value === board[j][i].value) {
//         count += 1;
//       }
//     }

//     if (count === board.length) {
//       return token.value;
//     }
//   }

//   // major diag
//   {
//     const token = row[0];
//     if (token.value !== '') {
//       let count = 0;
//       for (let n = 0; n < board.length; n += 1) {
//         if (board[n][n].value === token.value) {
//           count += 1;
//         }
//       }

//       if (count === board.length) {
//         return token.value;
//       }
//     }
//   }

//   // minor diag
//   {
//     const token = row[row.length - 1];
//     if (token.value !== '') {
//       let count = 0;
//       for (let n = 0; n < board.length; n += 1) {
//         if (board[row.length - 1 - n][n].value === token.value) {
//           count += 1;
//         }
//       }

//       if (count === board.length) {
//         return token.value;
//       }
//     }
//   }

//   return null;
// };

const App = () => {
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const player = getCurrentPlayer(squares);
  const playerToken = getTokenForPlayer(player);
  const draw = isDraw(squares);
  const winner = checkForWinner(squares);
  const playing = !draw && !winner;

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const onSquaredClicked = id => {
    if (winner) { return; }

    setSquares(squares => {
      return squares.map(row => {
        return row.map(cell => {
          if (cell.id === id && cell.value === '') {
            return { ...cell, value: playerToken };
          } else {
            return cell;
          }
        });
      });
    });
  };

  const resetGame = () => {
    setSquares(() => generateSquares());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {playing && <h2>It's {playerToken}'s turn</h2>}
        {winner && <h2>The winner is {winner}</h2>}
        {draw && <h2>The game is a draw</h2>}
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onSquaredClicked} />
      </main>
    </div>
  );
};

export default App;
