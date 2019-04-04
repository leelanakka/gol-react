import React from "react";
import "./index.css";

const initialGrid = function(height, width) {
  let grid = new Array(width).fill(height).map(x => new Array(x).fill(0));
  return grid;
};

const totalAliveNeighbors = function(cell, grid) {
  let neighbors = findingNeighbors([16, 16], cell);
  let isAlive = checkForAlive.bind(null, grid);
  let aliveNeighbor = neighbors.filter(isAlive);
  return aliveNeighbor.length;
};

const checkRangeForNegativeNumbers = function(cell) {
  return cell[0] >= 0 && cell[1] >= 0;
};

const predicate = function(cell, neighbour) {
  return !(cell[0] === neighbour[0] && cell[1] === neighbour[1]);
};

const isCoordinatesGreaterThanBoard = function(boardSize, cell) {
  return cell[0] < boardSize[0] && cell[1] < boardSize[1];
};

const checkForAlive = function(grid, neighbour) {
  return grid[neighbour[0]][neighbour[1]] !== 0;
};

const cartesian = function(set1, set2) {
  let resultSet = [];
  for (let rowIndex = 0; rowIndex < set1.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < set2.length; columnIndex++) {
      resultSet.push([set1[rowIndex], set2[columnIndex]]);
    }
  }
  return resultSet;
};

const validNeighbors = function(possibleNeighbors, cell, size) {
  let validNeighbors = possibleNeighbors.filter(neighbour =>
    predicate(cell, neighbour)
  );
  validNeighbors = validNeighbors.filter(checkRangeForNegativeNumbers);
  let checkGreaterThanBoard = isCoordinatesGreaterThanBoard.bind(null, size);
  validNeighbors = validNeighbors.filter(checkGreaterThanBoard);
  return validNeighbors;
};

const findingNeighbors = function(size, cell) {
  let rowCoordinates = [cell[0] - 1, cell[0], cell[0] + 1];
  let coloumnCoordinates = [cell[1] - 1, cell[1], cell[1] + 1];
  let possibleNeighbors = cartesian(rowCoordinates, coloumnCoordinates);
  let neighbors = validNeighbors(possibleNeighbors, cell, size);

  return neighbors;
};

const checkForNextGenration = function(currentCellState, neighbourLength) {
  let rules = [0, 0, currentCellState, 1, 0, 0, 0, 0, 0];
  return rules[neighbourLength];
};

const generateNextWorld = function(initialWorld) {
  let nextWorld = initialWorld.map(x => x.slice());
  for (let index = 0; index < initialWorld.length; index++) {
    for (let i = 0; i < initialWorld[0].length; i++) {
      let noOfAliveNeighbours = totalAliveNeighbors([index, i], initialWorld);
      let nextState = checkForNextGenration(
        initialWorld[index][i],
        noOfAliveNeighbours
      );
      nextWorld[index][i] = nextState;
    }
  }
  return nextWorld;
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.size = +props.size;
    const board = initialGrid(this.size + 1, this.size + 1);
    this.state = {
      board,
    };
  }

  makeCellLive(e) {
    const [rowId, colId] = e.target.id.split("_");
    const board = this.state.board.slice();
    board[rowId][colId] = 1 - board[rowId][colId];

    this.setState({ board });
  }

  start() {
    this.timerId = setInterval(() => {
      const board = generateNextWorld(this.state.board);
      this.setState({ board });
    }, 500);
  }

  stop() {
    clearInterval(this.timerId);
  }

  generateTable() {
    return this.state.board.map((row, rowId) => {
      const columns = row.map((col, colId) => {
        let className = "alive";
        if (col === 0) {
          className = "dead";
        }
        const id = rowId + "_" + colId;
        return (
          <td
            id={id}
            className={className}
            onClick={this.makeCellLive.bind(this)}
          />
        );
      });
      return <tr>{columns}</tr>;
    });
  }

  render() {
    return (
      <div className="main">
        <div className="welcomeText"> Welcome To Game Of Life</div>
        <table>
          <tbody>{this.generateTable()}</tbody>
        </table>
        <div className="options">
          <button onClick={this.start.bind(this)}>start</button>
          <button onClick={this.stop.bind(this)}>stop</button>
        </div>
      </div>
    );
  }
}

export default Board;
