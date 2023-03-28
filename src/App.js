import React, { Component, useState } from 'react';
// import Elevator from './Elevator';
import {delay, motion} from "framer-motion";
import  elevatorSvg from './elevator.svg';

const FLOOR_TRAVEL_TIME = 1;
let nextId = 0;

function Elevator(props) {
  
  if(props.elevator.isMoving){
    return(
      <motion.div
        animate={{ y: [props.elevator.currentFloor * -34 ,props.elevator.destinationFloor * -34]}}
        transition={{ duration: Math.abs(props.elevator.currentFloor - props.elevator.destinationFloor) * FLOOR_TRAVEL_TIME, type: "tween"}}
      >
        <img className='red' src={elevatorSvg} alt="Elevator" id='passenger_elevator_image'/>
      </motion.div>);
  }
  if(props.elevator.isArrived){
    return(
      <motion.div
        animate={{ y: [props.elevator.currentFloor * -34]}}
      >
        <img src={elevatorSvg} alt="Elevator" id='passenger_elevator_image'
        style={{filter: "invert(9%) sepia(99%) saturate(5630%) hue-rotate(246deg) brightness(111%) contrast(148%)"}} />
      </motion.div>);
  }
  else{
    return(
      <motion.div
        animate={{ y: [props.elevator.currentFloor * -34 ]}}
      >
        <img src={elevatorSvg} alt="Elevator" id='passenger_elevator_image'/>
      </motion.div>);
  }
    

}

function CallButten(props){
  const floorChose =  Object.keys(props.floorButtons).filter(
    (floorId) => props.floorButtons[floorId].floorNumber === props.floor
  )[0];
  if (props.floorButtons[floorChose].isArrivedActive)
  {
    return (<button key={props.keys} className='call'  onClick={props.onCallButtenClick}>Call</button>)
  }
  return (<button key={props.keys} className='call'  onClick={props.onCallButtenClick}>Call</button>)
}

const playSound = () => {
  const sound = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
  sound.play();
};

function Board(props){
  const [floorButtons, setFloorButtons] = useState({
    floor0:{
    isCallActive: false,
    isWaitingActive: false,
    isArrivedActive: false,
    floorNumber: 0
    },
    floor1:{
      isCallActive: false,
      isWaitingActive: false,
      isArrivedActive: false,
      floorNumber: 1
    },
    floor2:{
      isCallActive: false,
      isWaitingActive: false,
      isArrivedActive: false,
      floorNumber: 2
    },
    floor3:{
      isCallActive: false,
      isWaitingActive: false,
      isArrivedActive: false,
      floorNumber: 3
    },
    floor4:{
      isCallActive: false,
      isWaitingActive: false,
      isArrivedActive: false,
      floorNumber: 4
    },
    floor5:{
      isCallActive: false,
      isWaitingActive: false,
      isArrivedActive: false,
      floorNumber: 5
    },
    floor6:{
      isCallActive: false,
      isWaitingActive: false,
      isArrivedActive: false,
      floorNumber: 6
    },
    floor7:{
      isCallActive: false,
      isWaitingActive: false,
      isArrivedActive: false,
      floorNumber: 7
    },
    floor8:{
      isCallActive: false,
      isWaitingActive: false,
      isArrivedActive: false,
      floorNumber: 8
    },
    floor9:{
      isCallActive: false,
      isWaitingActive: false,
      isArrivedActive: false,
      floorNumber: 9
     },});
  const boardRows = [];
  const [callQueue, setCallQueue] = useState([]);
  const [elevatorStatus, setElevatorStatus] = useState({
    elevator1: {
      currentFloor: 0,
      destinationFloor: 0,
      isArrived: false,
      isMoving: false,
      isOccupied: false,
      timeTaken: null
    },
    elevator2: {
      currentFloor: 0,
      destinationFloor: 0,
      isMoving: false,
      isOccupied: false,
      isArrived: false,
      timeTaken: null,
    },
    elevator3: {
      currentFloor: 0,
      destinationFloor: 0,
      isMoving: false,
      isOccupied: false,
      isArrived: false,
      timeTaken: null,
    },
    elevator4: {
      currentFloor: 0,
      destinationFloor: 0,
      isMoving: false,
      isOccupied: false,
      isArrived: false,
      timeTaken: null,
    },
    elevator5: {
      currentFloor: 0,
      destinationFloor: 0,
      isMoving: false,
      isOccupied: false,
      isArrived: false,
      timeTaken: null,
    },
  });
  const handleCallElevator = (floorNumber) => {
    // find the closest available elevator to the floor
    const availableElevators = Object.keys(elevatorStatus).filter(
      (elevatorId) => !elevatorStatus[elevatorId].isOccupied
    );
    const floorChose =  Object.keys(floorButtons).filter(
      (floorId) => floorButtons[floorId].floorNumber === floorNumber
    )[0];
    if(availableElevators.length === 0){
      setFloorButtons({...floorButtons,
        [floorChose]: {...floorButtons[floorChose], isCallActive: true}
      });

      return;
    }
    setFloorButtons({...floorButtons,
      [floorChose]: {...floorButtons[floorChose], isMoving: true}
    });
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
        isOccupied: true
      },
    });
    setTimeout(() => {
      setElevatorStatus({
        ...elevatorStatus,
        [closestElevator]: {
          ...elevatorStatus[closestElevator],
          currentFloor: floorNumber,
          isMoving: false,
          isArrived: true,
          timeTaken : Math.abs(elevatorStatus[closestElevator].currentFloor - floorNumber) * FLOOR_TRAVEL_TIME
        },
      });
      setFloorButtons({...floorButtons,
        [floorChose]:
         {...floorButtons[floorChose], isMoving: false, isArrived:true}
      });
      playSound();
      
      setTimeout(() => {
        setElevatorStatus({
          ...elevatorStatus,
          [closestElevator]: {
            ...elevatorStatus[closestElevator],
          
            isArrived: false,
            isOccupied: false,
            // destinationFloor: null
          }
        });
        console.log(elevatorStatus);
        return;
        setTimeout(() => {
          setElevatorStatus({
            ...elevatorStatus,
            [closestElevator]: {
              ...elevatorStatus[closestElevator],
            
              isArrived: false,
              isOccupied: false,
              // destinationFloor: null
            }
          });
          console.log(elevatorStatus);
          return;
        }, 2000);
      }, 2000);
    }, Math.abs(elevatorStatus[closestElevator].currentFloor - floorNumber) * FLOOR_TRAVEL_TIME * 1000);
    console.log(`the2 ${elevatorStatus[closestElevator].destinationFloor}`);

  };
  for (let i = 9; i >= 0; i--) {
    const boardColumns = [];
    if(i===0){
      boardColumns.push(<td key={`floor-num-${i}`} className="floor-num">Ground Floor</td>);
    }
    else if(i===1){
      boardColumns.push(<td key={`floor-num-${i}`} className="floor-num">{i}st</td>);
    }
    else if(i===2){
      boardColumns.push(<td key={`floor-num-${i}`} className="floor-num">{i}nd</td>);
    }
    else if(i===3){
      boardColumns.push(<td key={`floor-num-${i}`} className="floor-num">{i}rd</td>);
    }
    else{
      boardColumns.push(<td key={`floor-num-${i}`} className="floor-num">{i}th</td>);
    }
    if(i === 0){
      boardColumns.push( Object.keys(elevatorStatus).map(elevatorId=> (<td key={`tdEl-${elevatorId}`} className="square" id='Elevator_Shaft_Cell'>
      {<><div key={`square-${elevatorId}`} className="square">
        <Elevator key={`elevator-${elevatorId}`} elevator={elevatorStatus[elevatorId]} />
        </div> </>}
      </td>))
        
      );
    }
    else{
      for (let j = 0; j < 5; j++) {
        boardColumns.push(<td key={`tdSq-${ i * 5 + j}`} className="square" id='Elevator_Shaft_Cell'><div  key={`square-${ i * 5 + j}`} className="square">{}</div></td>);  
      }
    } 
    
    boardColumns.push(<td key={`td-${i}`}>
      <CallButten keys={`CallButten-${i}`} floorButtons={floorButtons} floor={i}  onCallButtenClick={ () => handleCallElevator(i, props.elevators)}/>
      </td>);
    // boardRows.push(<div key={i + 300} className="board-row">{boardColumns}</div>);
    boardRows.push(<tr key={`td-${i}`} className="board-row">{boardColumns}</tr>);
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



