import React, { Component } from 'react';
import Sound from 'react-sound';

import PlayerStage from './PlayerStage';
import CpuStage from './CpuStage';
import './battleStage.css';
import './healthbar.css';

class Battlestage extends Component {     
     render(){
          return(

               <section className="battleStage">
                    {this.props.soundOn === true ? <Sound url="./sound/battleSound.mp3" playStatus={Sound.status.PLAYING} loop={true} /> : null }
                    <div className="wrapper">
                    
                    <CpuStage 
                    cpuChoice={this.props.cpuChoice} 
                    cpuAttacks={this.props.cpuAttacks} 
                    cpuHp={this.props.cpuHp} 
                    cpuPower={this.props.cpuPower}
                    attackExecuted={this.props.attackExecuted}
                    cpuPic={this.props.cpuPic}
                    percentCpuHp={this.props.percentCpuHp}
                    cpuAnimated={this.props.cpuAnimated}
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
                    narrationPanel={this.props.narrationPanel}
                    playerTurn={this.props.playerTurn}
                    playerPic={this.props.playerPic}
                    percentPlayerHp={this.props.percentPlayerHp}
                    playerAnimated={this.props.playerAnimated}/>
                   
                    </div>

               </section>
          )
     }



}

export default Battlestage;