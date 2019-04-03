import React from "react";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.size = +props.size;
    this.state = {
      liveCells: [],
      bounds: { topLeft: 0, bottomRight: this.size }
    };
  }

  makeCellLive(e) {
    const id = e.target.id;
    this.setState(state => {
      state.liveCells.push([id]);
    });

    document.getElementById(e.target.id).style.background = "black";
  }

  createRow(rowIndex) {
    const table = [];
    for (let index = 0; index <= this.size; index++) {
      table.push(
        <td
          key={index + Math.random()}
          onClick={this.makeCellLive.bind(this)}
          id={rowIndex + "_" + index}
        >
          1
        </td>
      );
    }
    return table;
  }

  updateLiveCells() {
    this.setState(state => {
      state.liveCells = this.nextGeneration(state.liveCells, state.bounds);
    });
  }

  getDimension() {
    return {
      height: this.size,
      width: this.size
    };
  }

  initialGrid(height, width) {
    let grid = new Array(width).fill(height).map(x => new Array(x).fill(" "));
    return grid;
  }

  

  totalAliveNeighbors(cell, grid) {
    let neighbors = this.findingNeighbors([this.size, this.size], cell);
    let isAlive = this.checkForAlive.bind(null, grid);
    let aliveNeighbor = neighbors.filter(isAlive);
    return aliveNeighbor.length;
  }

  checkRangeForNegativeNumbers(cell) {
    return cell[0] >= 0 && cell[1] >= 0;
  }

  predicate(cell, neighbour) {
    return !(cell[0] === neighbour[0] && cell[1] === neighbour[1]);
  }

  isCoordinatesGreaterThanBoard(boardSize, cell) {
    return cell[0] < boardSize[0] && cell[1] < boardSize[1];
  }

  checkForAlive(grid, neighbour) {
    return grid[neighbour[0]][neighbour[1]] === "*";
  }

  cartesian(set1, set2) {
    let resultSet = [];
    for (let rowIndex = 0; rowIndex < set1.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < set2.length; columnIndex++) {
        resultSet.push([set1[rowIndex], set2[columnIndex]]);
      }
    }
    return resultSet;
  }

  validNeighbors(possibleNeighbors, cell, size) {
    let validNeighbors = possibleNeighbors.filter(neighbour =>
      this.predicate(cell, neighbour)
    );
    validNeighbors = validNeighbors.filter(this.checkRangeForNegativeNumbers);
    let checkGreaterThanBoard = this.isCoordinatesGreaterThanBoard.bind(
      null,
      size
    );
    validNeighbors = validNeighbors.filter(checkGreaterThanBoard);
    return validNeighbors;
  }

  findingNeighbors(size, cell) {
    let rowCoordinates = [cell[0] - 1, cell[0], cell[0] + 1];
    let coloumnCoordinates = [cell[1] - 1, cell[1], cell[1] + 1];
    let possibleNeighbors = this.cartesian(rowCoordinates, coloumnCoordinates);
    let neighbors = this.validNeighbors(possibleNeighbors, cell, size);

    return neighbors;
  }

  checkForNextGenration(currentCellState, neighbourLength) {
    let rules = [" ", " ", currentCellState, "*", " ", " ", " ", " ", " "];
    return rules[neighbourLength];
  }

  generateNextWorld(initialWorld) {
    let nextWorld = initialWorld.map(x => x.slice());
    for (let index = 0; index < initialWorld.length; index++) {
      for (let i = 0; i < initialWorld[0].length; i++) {
        let noOfAliveNeighbours = this.totalAliveNeighbors(
          [index, i],
          initialWorld
        );
        let nextState = this.checkForNextGenration(
          initialWorld[index][i],
          noOfAliveNeighbours
        );
        nextWorld[index][i] = nextState;
      }
    }
    return nextWorld;
  }

  getAliveCellsOfNextGeneration(nextWorld, width, height) {
    let result = [];
    for (let rowIndex = 0; rowIndex < width; rowIndex++) {
      for (let colomnIndex = 0; colomnIndex < height; colomnIndex++) {
        if (nextWorld[rowIndex][colomnIndex] === "*") {
          result.push([rowIndex, colomnIndex]);
        }
      }
    }
    return result;
  }

  generateWorld(grid, aliveCells) {
    console.log("grid is "+grid);
    console.log("alive cells are "+aliveCells)
    for (let aliveCell of aliveCells) {
      grid[aliveCell[0].split("_")[0]][aliveCell[0].split("_")[1]] = "*";
    }
    return grid;
  }

  nextGeneration(currGeneration, bounds) {
    let { topLeft } = this.state.bounds;

    let { height, width } = this.getDimension();
    let grid = this.generateWorld(
      this.initialGrid(width, height),
      currGeneration
    );
    let nextWorld = this.generateNextWorld(grid);
    return this.getAliveCellsOfNextGeneration(nextWorld, height, width).map(
      cell => [cell[0] + topLeft[0], cell[1] + topLeft[1]]
    );
  }

  start() {
    this.state.liveCells.forEach(coordinate => {
      document.getElementById(coordinate.join("")).style.background = "red";
      this.updateLiveCells();
    });
  }

  createTable() {
    const row = [];
    for (let index = 0; index <= this.size; index++) {
      row.push(
        <tr key={index} onClick={this.makeCellLive.bind(this)}>
          {this.createRow(index)}{" "}
        </tr>
      );
    }
    return row;
  }

  render() {
    return (
      <div>
        <table>
          <tbody>{this.createTable()}</tbody>
        </table>
        <button onClick={this.start.bind(this)}>start</button>
        <button>stop</button>
      </div>
    );
  }
}

export default Board;
