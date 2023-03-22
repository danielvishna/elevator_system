import React, { Component, useState } from 'react';
// import Elevator from './Elevator';
import {delay, motion} from "framer-motion";
import elevatorSvg from './elevator.svg';

function Elevator(props) {
  return(
    <motion.div
      animate={{ y: [0 ,props.currentFloor * -33]}}
      transition={{ duration: props.currentFloor , type: "tween"}}
    >
      <img src={elevatorSvg} alt="Elevator" id='passenger_elevator_image'/>
    </motion.div>)
  ;
}

function Board(){
  const boardRows = [];
  const [currentFloor, setCurrentFloor] = useState(0);
  // const [doMove, setDoMove] = useState(false);

  //Todo: change all the keys
  for (let i = 9; i >= 0; i--) {
    const boardColumns = [];
    if(i===0){
      boardColumns.push(<td key={i} className="floor-num">Ground Floor</td>);
    }
    else if(i===1){
      boardColumns.push(<td key={i} className="floor-num">{i}st</td>);
    }
    else if(i===2){
      boardColumns.push(<td key={i} className="floor-num">{i}nd</td>);
    }
    else if(i===3){
      boardColumns.push(<td key={i} className="floor-num">{i}rd</td>);
    }
    else{
      boardColumns.push(<td key={i} className="floor-num">{i}th</td>);
    }
    for (let j = 0; j < 3; j++) {
     
        if(i === 0){
          boardColumns.push(
              <td key={i * 5 + j + 2000} className="square" id='Elevator_Shaft_Cell'>{<><div key={i * 5 + j + 100} className="square"><Elevator key={j + 78} currentFloor={currentFloor} /></div> </>}</td>
            );
        }
        else{
          boardColumns.push(<td key={i * 5 + j + 2000} className="square" id='Elevator_Shaft_Cell'><div key={i*5 + j + 100} className="square">{}</div></td>
          );  
        }
      

    }
    boardColumns.push(<td key={i + 390}><button key={i + 200} className='call'  onClick={() => {
      setCurrentFloor(i);
      
    }
    }>Call</button></td>);
    // boardRows.push(<div key={i + 300} className="board-row">{boardColumns}</div>);
    boardRows.push(<tr className="board-row">{boardColumns}</tr>);
  }
  return <table>{boardRows}</table> 
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



