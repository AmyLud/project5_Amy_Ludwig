import React from 'react';
import './winlose.css';
import Sound from 'react-sound';



const WinLose = (props)=> {

     return(
          <section className="winLosePanel">
               { props.soundOn === true ? (props.gameWon === true ? <Sound url="./sound/victorySound.mp3" playStatus={Sound.status.PLAYING} loop={true} /> : <Sound url="./sound/loseSound.mp3" playStatus={Sound.status.PLAYING} loop={true} />) : null}

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