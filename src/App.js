import React, { Component, useState } from 'react';
// import Elevator from './Elevator';
import {delay, motion} from "framer-motion";
import elevatorSvg from './elevator.svg';
function Elevator(props) {
  return (
    <motion.div
      animate={{ y: [0 ,props.currentFloor * -33, 0], x: -40}}
      transition={{ duration: props.currentFloor, type: "tween"}}
    >
      <img className='img' src={elevatorSvg} alt="Elevator" />
    </motion.div>
  );
}

function Board(){
  const boardRows = [];
  const [currentFloor, setCurrentFloor] = useState(0);
  // const [doMove, setDoMove] = useState(false);

  //Todo: change all the keys
  for (let i = 9; i >= 0; i--) {
    const boardColumns = [];
    if(i===0){
      boardColumns.push(<div key={i} className="floor-num">Ground Floor</div>);
    }
    else if(i===1){
      boardColumns.push(<div key={i} className="floor-num">{i}st</div>);
    }
    else if(i===2){
      boardColumns.push(<div key={i} className="floor-num">{i}nd</div>);
    }
    else if(i===3){
      boardColumns.push(<div key={i} className="floor-num">{i}rd</div>);
    }
    else{
      boardColumns.push(<div key={i} className="floor-num">{i}th</div>);
    }
    for (let j = 0; j < 3; j++) {
      boardColumns.push(
          <div key={i*5 + j + 100} className="square">{}</div>
        );
        if(i === 0 && (j === 2|| j === 0)){
          boardColumns.push(<Elevator key={j + 78} currentFloor={currentFloor}/>);
        }
      

    }
    boardColumns.push(<button key={i + 200} className='call'  onClick={() => {
      setCurrentFloor(i);
      
    }
    }>Call</button>);
    boardRows.push(<div key={i + 300} className="board-row">{boardColumns}</div>);
  }
  return boardRows
}


export default function Building(){

  // const { floors } = this.state;
  const [elevatorMoving, setElevatorMoving] = useState([Array(5).fill(false)]);
  const [elevatorFloor, setElevatorFloor] = useState([Array(5).fill(0)]);
  const [buttonCall, setButtonCall] = useState([Array(10).fill(false)]);
  
  return (
    <>
      <h1 key={900}>Elevator Exercise</h1>
      <div key={800} className="building">
        <Board/>
      </div>
      </>
    );
  }



