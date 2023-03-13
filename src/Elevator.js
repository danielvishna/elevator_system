import React, { Component } from 'react';
import elevatorSvg from './elevator.svg';

class Elevator extends Component {
  state = {
    currentFloor: 1, // start at the ground floor
    direction: 'up', // start moving up
  };

  moveToFloor = (floor) => {
    // Logic to move the elevator to a specific floor goes here
  };

  render() {
    const { currentFloor } = this.state;

    return (
      <div className="elevator">
        <img className='img' src={elevatorSvg} alt="Elevator" />
        <div className="floor-indicator">{currentFloor}</div>
      </div>
    );
  }
}

export default Elevator;