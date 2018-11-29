import React, { Component } from 'react';
import NarrationPanel from './NarrationPanel';


class PlayerStage extends Component {


     // attackDisplay = ()=>{
          
     // }


     // componentDidMount(){

     // }



     render(){
          return(
               <div className="playerStage">
                    <h3>PLAYER</h3>
                    <h4>{this.props.playerChoice.name}</h4>

                    {/* <img src="https://fillmurray.com/200/200" alt=""/> */}

                    <div className="actionBox">
                         <div className="actionBox--healthBar" data-total="1000" data-value="1000">
                              <p>HP: {this.props.playerHp}</p>
                              <p>Attack: {this.props.playerPower}</p>
                              <div className="bar">
                                   <div className="hit"></div>
                              </div>
                         </div>
                         <div className="actionBox--attackPanel">
                              {
                                   this.props.playerAttacks.map((attack)=>{
                                        return(
                                             <button onClick={this.props.attackExecuted} key={attack.move.name} id={attack.move.name} value={this.props.playerPower} >
                                                  {attack.move.name}
                                             </button>

                                        )
                                   })
                              }

                              <NarrationPanel
                                   cpuChoice={this.props.cpuChoice}
                                   cpuAttacks={this.props.cpuAttacks}
                                   cpuHp={this.props.cpuHp}
                                   cpuPower={this.props.cpuPower}
                                   attackExecuted={this.props.attackExecuted}
                                   playerChoice={this.props.playerChoice}
                                   narrationPanel={this.props.narrationPanel} />
                         </div>
                    </div>
               </div>
          )
     }

}




export default PlayerStage;