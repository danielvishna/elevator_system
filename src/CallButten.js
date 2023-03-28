import React from 'react';
function CallButten(props){
    const floorChose =  props.floor;
    if (props.floorButtons[floorChose].isArrivedActive){
      return (<button key={props.keys} className='arrived'  onClick={props.onCallButtenClick}>Arrived</button>);
    }
    if (props.floorButtons[floorChose].isWaitingActive){
      return (<button key={props.keys} className='waiting'  onClick={props.onCallButtenClick}>Waiting</button>);
    }
    return (<button key={props.keys} className='call'  onClick={props.onCallButtenClick}>Call</button>);
  }

  export default CallButten;