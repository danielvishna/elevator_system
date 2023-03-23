import React, { Component, useState } from 'react';
// import Elevator from './Elevator';
import {delay, motion} from "framer-motion";
import  elevatorSvg from './elevator.svg';

function Elevator(props) {
  if(props.destinationFloor === null){
    return (<img src={elevatorSvg} alt="Elevator" id='passenger_elevator_image'/>);
  }
  return(
    <motion.div
      animate={{ y: [0 ,props.destinationFloor * -34, 0]}}
      transition={{ duration: props.destinationFloor , type: "tween"}}
    >
      <img className='red' src={elevatorSvg} alt="Elevator" id='passenger_elevator_image'/>
    </motion.div>)
  ;
}

function CallButten(props){
  return (<button key={props.keys} className='call'  onClick={props.onCallButtenClick}>Call</button>)
}
let elevators = []

function Board(){
  const boardRows = [];
  const [currentFloor, setCurrentFloor] = useState(0);
  const [elevatorStatus, setElevatorStatus] = useState({
    elevator1: {
      currentFloor: 0,
      destinationFloor: null,
      isMoving: false,
      isOccupied: false,
      timeTaken: null,
    },
    elevator2: {
      currentFloor: 0,
      destinationFloor: null,
      isMoving: false,
      isOccupied: false,
      timeTaken: null,
    },
    elevator3: {
      currentFloor: 0,
      destinationFloor: null,
      isMoving: false,
      isOccupied: false,
      timeTaken: null,
    },
    elevator4: {
      currentFloor: 0,
      destinationFloor: null,
      isMoving: false,
      isOccupied: false,
      timeTaken: null,
    },
    elevator5: {
      currentFloor: 0,
      destinationFloor: null,
      isMoving: false,
      isOccupied: false,
      timeTaken: null,
    },
  });
  const [elevators, setElevators] = useState([]);
  const handleCallElevator = (floorNumber) => {
    // find the closest available elevator to the floor
    const availableElevators = Object.keys(elevatorStatus).filter(
      (elevatorId) => !elevatorStatus[elevatorId].isOccupied
    );
    const elevatorDistances = availableElevators.map((elevatorId) =>
      Math.abs(elevatorStatus[elevatorId].currentFloor - floorNumber)
    );
    const closestElevatorIndex = elevatorDistances.indexOf(Math.min(...elevatorDistances));
    const closestElevator = availableElevators[closestElevatorIndex];

    // send the elevator to the floor
    setElevatorStatus({
      ...elevatorStatus,
      [closestElevator]: {
        ...elevatorStatus[closestElevator],
        destinationFloor: floorNumber,
        isMoving: true,
        isOccupied: true,
      },
    });};
  
  // const [doMove, setDoMove] = useState(false);

  //Todo: change all the keys
  for (let i = 9; i >= 0; i--) {
    const boardColumns = [];
    if(i===0){
      boardColumns.push(<td key={"floor-num"+i} className="floor-num">Ground Floor</td>);
    }
    else if(i===1){
      boardColumns.push(<td key={"floor-num"+i} className="floor-num">{i}st</td>);
    }
    else if(i===2){
      boardColumns.push(<td key={"floor-num"+i} className="floor-num">{i}nd</td>);
    }
    else if(i===3){
      boardColumns.push(<td key={"floor-num"+i} className="floor-num">{i}rd</td>);
    }
    else{
      boardColumns.push(<td key={"floor-num"+i} className="floor-num">{i}th</td>);
    }
    if(i === 0){
      boardColumns.push( Object.keys(elevatorStatus).map(elevatorId=> (<td key={"td" + elevatorId} className="square" id='Elevator_Shaft_Cell'>
      {<><div key={"square" + elevatorId} className="square">
        <Elevator key={"elevator"+elevatorId} currentFloor={elevatorStatus[elevatorId].currentFloor} destinationFloor={elevatorStatus[elevatorId].destinationFloor} />
        </div> </>}
      </td>))
        
      );
    }
    else{
      for (let j = 0; j < 5; j++) {
     
        if(i === 0){
          const el = "elevator" + (j + 1)
          
        }
        else{
          boardColumns.push(<td key={"td" + i * 5 + j} className="square" id='Elevator_Shaft_Cell'><div  key={"square" +(i * 5 + j)} className="square">{}</div></td>
          );  
        }
      

    }
    } 
    
    boardColumns.push(<td key={i + 390}><CallButten keys={"CallButten"+i} onCallButtenClick={ () => handleCallElevator(i)}/></td>);
    // boardRows.push(<div key={i + 300} className="board-row">{boardColumns}</div>);
    boardRows.push(<tr key={-i} className="board-row">{boardColumns}</tr>);
  }
  return <table><tbody>{boardRows}</tbody></table> 
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



