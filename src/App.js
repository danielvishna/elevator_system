import React, { Component, useRef, useEffect, useState } from 'react';
import Elevator from './Elevator';
import CallButten from './CallButten';
const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

const elevatorsNumber = 5;
const floorsNumber = 10;
const FLOOR_TRAVEL_TIME = 1;
let nextId = 0;

const playSound = () => {
  const sound = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
  sound.play();
};

function Board(props){
  const [floorButtons, setFloorButtons] = useState(
    Array.from({ length: floorsNumber }, (_, i) => ({
      isCallActive: false,
      isWaitingActive: false,
      isArrivedActive: false,
      floorNumber: i
    }))
  );
  const [elevatorStatus, setElevatorStatus] = useState(Array.from({ length: elevatorsNumber }, () => ({
    currentFloor: 0,
    destinationFloor: 0,
    isMoving: false,
    isArrived: false,
    isOccupied: false,
    timeTaken: 0,
  })));
  
  const boardRows = [];
  const [callQueue, setCallQueue] = useState([]);
 
  function handleCallElevator (floorNumber){
    // find the closest available elevator to the floor
    if(floorButtons[floorNumber].isCallActive == true){
      return
    }
    const availableElevators = Object.keys(elevatorStatus).filter(
      (elevatorId) => !elevatorStatus[elevatorId].isOccupied);    
    if(availableElevators.length === 0){
      setCallQueue(q => ([...q,{ id: nextId++, floorNumber: floorNumber }]));
      setFloorButtons(b => ({...b,
        [floorNumber]: {...b[floorNumber], isWaitingActive: true}}));
      return;
    }
    setFloorButtons(b => ({...b,
      [floorNumber]: {...b[floorNumber], isWaitingActive: true, isCallActive: true}}));
    const elevatorDistances = availableElevators.map((elevatorId) =>
      Math.abs(elevatorStatus[elevatorId].currentFloor - floorNumber)
    );
    const closestElevatorIndex = elevatorDistances.indexOf(Math.min(...elevatorDistances));
    const closestElevator = availableElevators[closestElevatorIndex];
    // send the elevator to the floor
    setElevatorStatus(e => ({
      ...e,
      [closestElevator]: {
        ...e[closestElevator],
        destinationFloor: floorNumber,
        isMoving: true,
        isOccupied: true
      },
    }));
    setTimeout(() => {
      setElevatorStatus(e => ({
        ...e,
        [closestElevator]: {
          ...e[closestElevator],
          currentFloor: floorNumber,
          isMoving: false,
          isArrived: true,
          timeTaken : Math.abs(elevatorStatus[closestElevator].currentFloor - floorNumber) * FLOOR_TRAVEL_TIME
        },
      }));
      setFloorButtons(b => ({...b,
        [floorNumber]: {...b[floorNumber], isArrivedActive: true, isWaitingActive: false}}));
      playSound();
      
      setTimeout(() => {
        setElevatorStatus(e => ({
          ...e,
          [closestElevator]: {
            ...e[closestElevator],
            isArrived: false,
            isOccupied: false,
            timeTaken: 0,
          },
        }));
        setFloorButtons(b => ({...b,
          [floorNumber]: {...b[floorNumber], isArrivedActive: false, isCallActive:false}}));
      }, 2000);
    }, Math.abs(elevatorStatus[closestElevator].currentFloor - floorNumber) * FLOOR_TRAVEL_TIME * 1000);

  };
  const availableElevators = Object.keys(elevatorStatus).filter(
    (elevatorId) => !elevatorStatus[elevatorId].isOccupied
  );
  useDidMountEffect(() => {
    if(callQueue.length > 0 && availableElevators.length > 0){
      const nextCall = callQueue[0];
      setCallQueue(q => (q.slice(1, q.length)));
      handleCallElevator(nextCall.floorNumber);
    }
  },  [callQueue.length > 0 && availableElevators.length > 0]);


  for (let i = floorsNumber - 1; i >= 0; i--) {
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
      for (let j = 0; j < elevatorsNumber; j++) {
        boardColumns.push(<td key={`tdSq-${ i * elevatorsNumber + j}`} className="square" id='Elevator_Shaft_Cell'>
          <div  key={`square-${ i * elevatorsNumber + j}`} className="square">{}</div></td>);  
      }
    } 
    
    boardColumns.push(<td key={`td-${i}`}>
      <CallButten keys={`CallButten-${i}`} floorButtons={floorButtons} floor={i}  onCallButtenClick={ () => handleCallElevator(i)}/>
      </td>);
    boardRows.push(<tr key={`td-${i}`} className="board-row">{boardColumns}</tr>);
  }
  return <table><tbody>{boardRows}</tbody></table> 
}


export default function Building(){
  return (
    <>
      <h1 key="Elevator Exercise" >Elevator Exercise</h1>
      <div key="building" className="building">
        <Board/>
      </div>
      </>
    );
  }



