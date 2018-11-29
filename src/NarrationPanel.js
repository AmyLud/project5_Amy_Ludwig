import React from 'react';


const NarrationPanel=(props)=>{

     //Change between "a wild ____ has appeared!"
     //"Trainer used ____________! "
     //"{cpuChoice.name} used _________! Ouch!"
     

     return (
          <div className="narrationPanel">
               <p>{props.narrationPanel}</p>

          </div>

     )



}
export default NarrationPanel;