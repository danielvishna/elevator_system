import React, { Component } from 'react';
// import Elevator from './Elevator';
import {motion} from "framer-motion";
import elevatorSvg from './elevator.svg';


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

  for (let i = 9; i >= 0; i--) {
    const boardColumns = [];
    if(i===0){
      boardColumns.push(<h4 className="floor-num">Ground Floor</h4>);
    }
    else if(i===1){
      boardColumns.push(<div className="floor-num">{i}st</div>);
    }
    else if(i===2){
      boardColumns.push(<div className="floor-num">{i}nd</div>);
    }
    else if(i===3){
      boardColumns.push(<div className="floor-num">{i}rd</div>);
    }
    else{
      boardColumns.push(<div className="floor-num">{i}th</div>);
    }
    for (let j = 0; j < 5; j++) {
      if(i === 0){
        boardColumns.push(<motion.div>
         <img className='img' src={elevatorSvg} alt="Elevator" />
        </motion.div>);
      }
      boardColumns.push(
          <div className="square">{}</div>
        );
      

    }
    boardColumns.push(<button className='call'>Call</button>);
    boardRows.push(<div className="board-row">{boardColumns}</div>);
  }
    return (
      <>
      <h1>Elevator Exercise</h1>
      <div className="building">
        {boardRows}
      </div>
      </>
    );
  }
}

export default Building;
