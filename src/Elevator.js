import React, { Component } from 'react';
import elevatorSvg from './elevator.svg';
import {motion} from "framer-motion";
const FLOOR_TRAVEL_TIME = 1;
const higthRow = -41;

function Elevator(props) {
  
  if(props.elevator.isMoving){
    return(
      <motion.div
        animate={{ y: [props.elevator.currentFloor * higthRow ,props.elevator.destinationFloor * higthRow]}}
        transition={{ duration: Math.abs(props.elevator.currentFloor - props.elevator.destinationFloor) * FLOOR_TRAVEL_TIME, type: "tween"}}
      >
        <img className='red' src={elevatorSvg} alt="Elevator" id='passenger_elevator_image'/>
      </motion.div>);
  }
  if(props.elevator.isArrived){
    return(
      <motion.div
        animate={{ y: [props.elevator.currentFloor * higthRow]}} className="green"
      >
        <img src={elevatorSvg} alt="Elevator" id='passenger_elevator_image'
         className='green' />
      </motion.div>);
  }
  else{
    return(
      <motion.div
        animate={{ y: [props.elevator.currentFloor * higthRow]}}
      >
        <img src={elevatorSvg} alt="Elevator" id='passenger_elevator_image'/>
      </motion.div>);
  }
    

}

export default Elevator;