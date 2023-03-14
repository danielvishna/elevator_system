import React, { Component, useState } from 'react';
// import Elevator from './Elevator';
import {motion} from "framer-motion";
import elevatorSvg from './elevator.svg';


export default function Building(){
   // const { floors } = this.state;
  const boardRows = [];
  // const [doMove, setDoMove] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(0);
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
    for (let j = 0; j < 1; j++) {
      boardColumns.push(
          <div key={i*5 + j + 100} className="square">{}</div>
        );
        if(i === 0){
          boardColumns.push(<motion.div key={700 + j}
          animate={{y :  currentFloor * -32, x: -40}} 
          transition = {{type : "tween"}}
          >
           <img className='img' src={elevatorSvg} alt="Elevator" />
          </motion.div>);
        }
      

    }
    boardColumns.push(<button key={i + 200} className='call'  onClick={() => setCurrentFloor(i)}>Call</button>);
    boardRows.push(<div key={i + 300} className="board-row">{boardColumns}</div>);
  }
    return (
      <>
      <h1 key={900}>Elevator Exercise</h1>
      <div key={800} className="building">
        {boardRows}
      </div>
      </>
    );
  }



