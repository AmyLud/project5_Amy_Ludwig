import React, { Component } from 'react';
import NarrationPanel from './NarrationPanel';
import './playerStage.css';
import './attackPanel.css';
import Moves from './Moves';
import './flashAnimation.css';

class PlayerStage extends Component {



     isNotMyTurn = ()=>{
         return (this.props.playerTurn === false ? true : false);
     }


     render(){
          return(
               <div className="playerStage">
                    <div className="playerInfo">
                         <div className="playerImg">
                              <img className={this.props.playerAnimated === true ? "animated" : null} src={this.props.playerPic} alt={this.props.playerChoice.name}/>
                         </div>
                         <div className="actionBox">
                              <h3>{this.props.playerChoice.name}</h3>
                              <div className="hpInfo">
                                   <div className="hitBar">
                                        <p>HP</p>
                                        <div className="actionBox--healthBar" data-total="1000" data-value="1000">
                                             {/* <p>Attack: {this.props.cpuPower}</p> */}
                                             <div className="playerBar" style={{ 
                                                  width: this.props.percentPlayerHp+'%',
                                                  background: this.props.percentPlayerHp >= 65 ? "green" : this.props.percentPlayerHp >= 30 ? "#dfc532" : "#b82323" }}>
                                                  <div className="hit"></div>
                                             </div>
                                        </div>
                                   </div>
                                   <p> {this.props.playerHp}/{this.props.playerChoice.stats[5].base_stat}</p>
                              </div>

                         </div>
                    </div>
                    <div className="actionBox--attackPanel">
                         { this.props.playerTurn === true ? 
                              <Moves playerAttacks={this.props.playerAttacks} playerPower={this.props.playerPower} isNotMyTurn={this.isNotMyTurn} attackExecuted={this.props.attackExecuted} />
                              : 
                              <NarrationPanel
                                   cpuChoice={this.props.cpuChoice}
                                   cpuAttacks={this.props.cpuAttacks}
                                   cpuHp={this.props.cpuHp}
                                   cpuPower={this.props.cpuPower}
                                   attackExecuted={this.props.attackExecuted}
                                   playerChoice={this.props.playerChoice}
                                   narrationPanel={this.props.narrationPanel} />
                              }





                              {/* { 
                                   this.props.playerAttacks.map((attack)=>{
                                        return(
                                             <button disabled={this.isNotMyTurn()} onClick={this.props.attackExecuted} key={attack.move.name} id={attack.move.name} value={this.props.playerPower} >
                                                  {attack.move.name}
                                             </button>

                                        )
                                   })
                              } */}
                    </div>
               </div>
          )
     }

}




export default PlayerStage;