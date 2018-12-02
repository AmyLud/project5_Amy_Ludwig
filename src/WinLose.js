import React from 'react';
import './winlose.css';


const WinLose = (props)=> {

     return(
          <section className="winLosePanel">
               <div className="wrapper">
               <div className="winLoseText">
                    {props.gameWon === true ? <h3>{props.cpuChoice.name} has fainted! {props.playerChoice.name} has led you to victory!</h3> : <h3>{props.playerChoice.name} has fainted! {props.cpuChoice.name} escapes to nurse their battle wounds...</h3> }
               </div>

               <div className="winLoseButton">
                    <button onClick={props.returnToStart}>Battle Again!</button>
               </div>
               </div>


          </section>
     )


}


export default WinLose;