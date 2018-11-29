import React, { Component } from 'react';
// import NarrationPanel from './NarrationPanel';

class CpuStage extends Component {
     render(){
          return(
               <div className="cpuStage">
                    <h3>CPU</h3>
                    <h4>{this.props.cpuChoice.name}</h4>


                    <div className="actionBox">
                         <div className="actionBox--healthBar" data-total="1000" data-value="1000">
                              <p>HP: {this.props.cpuHp}</p>
                              <p>Attack: {this.props.cpuPower}</p>
                              <div className="bar">
                                   <div className="hit"></div>
                              </div>
                         </div>
                         <div className="actionBox--attackPanel">

                              {/* <NarrationPanel 
                                   cpuChoice={this.props.cpuChoice}
                                   cpuAttacks={this.props.cpuAttacks}
                                   cpuHp={this.props.cpuHp}
                                   cpuPower={this.props.cpuPower}
                                   attackExecuted={this.props.attackExecuted}
                                   playerChoice={this.props.playerChoice}
                                   narrationPanel={this.props.narrationPanel}/> */}
                         </div>
                    </div>
               </div>
          )
     }





}

export default CpuStage;