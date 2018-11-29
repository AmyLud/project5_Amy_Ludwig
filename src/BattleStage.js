import React, { Component } from 'react';
import PlayerStage from './PlayerStage';
import CpuStage from './CpuStage';

class Battlestage extends Component {
     

     render(){
          return(
               <div className="battleStage">
                    <h2>BATTLE!</h2>
                    
                    <CpuStage 
                    cpuChoice={this.props.cpuChoice} 
                    cpuAttacks={this.props.cpuAttacks} 
                    cpuHp={this.props.cpuHp} 
                    cpuPower={this.props.cpuPower}
                    attackExecuted={this.props.attackExecuted}
                    // narrationPanel={this.props.narrationPanel}
                    />
                    <PlayerStage 
                    playerChoice={this.props.playerChoice} 
                    playerAttacks={this.props.playerAttacks} 
                    playerHp={this.props.playerHp} 
                    playerPower={this.props.playerPower} 
                    cpuChoice={this.props.cpuChoice} 
                    cpuAttacks={this.props.cpuAttacks} 
                    cpuHp={this.props.cpuHp} 
                    cpuPower={this.props.cpuPower}
                    attackExecuted={this.props.attackExecuted}
                    narrationPanel={this.props.narrationPanel}/>

               </div>
          )
     }



}

export default Battlestage;