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
      state.liveCells.map(x=>x);
    });
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
