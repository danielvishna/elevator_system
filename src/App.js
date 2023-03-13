import { useState } from 'react';
import Elevator from './Elevator';

class Building extends Component {
  state = {
    floors: [
      { id: 10, calling: false },
      { id: 9, calling: false },
      { id: 8, calling: false },
      { id: 7, calling: false },
      { id: 6, calling: false },
      { id: 5, calling: false },
      { id: 4, calling: false },
      { id: 3, calling: false },
      { id: 2, calling: false },
      { id: 1, calling: false }, // ground floor
    ],
  };

  callElevator = (floorId) => {
    // Logic to call an elevator to a specific floor goes here
  };
  

  render() {
    // const { floors } = this.state;
    const boardRows = [];
    for(let i= 0; i < 10; i++){
      const boardColumns = [];
      if(i===0){
        boardColumns.push(<h4>Ground Floor</h4>);
      }
      else if(i===1){
        boardColumns.push(<h4>{i}st</h4>);
      }
      else if(i===2){
        boardColumns.push(<h4>{i}nd</h4>);
      }
      else if(i===3){
        boardColumns.push(<h4>{i}rd</h4>);
      }
      else{
        boardColumns.push(<h4>{i}th</h4>);
      }
      boardRows.push(<div key={i} className="board-row">{boardColumns}</div>);
    }
    return (
      <>
      <div className="building">
        {boardRows}
      </div>
      </>
    );
  }
}

export default Building;
