import React from "react";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.size = +props.size;
  }

  createTable() {
    const table = [];
    for (let index = 0; index <= this.size; index++) {
      table.push(<td />);
    }
    return table;
  }

  createRow() {
    const row = [];
    for (let index = 0; index <= this.size; index++) {
      row.push(<tr>{this.createTable()}</tr>);
    }
    return row;
  }

  render() {
    return (
      <table>
        <tbody>{this.createRow()}</tbody>
      </table>
    );
  }
}

export default Board;
