import React, { Component } from 'react';
// import NarrationPanel from './NarrationPanel';
import './cpuStage.css';
import './flashAnimation.css';


class CpuStage extends Component {
     render(){
          return(
               <div className="cpuStage">



                    <div className="cpuActionBox">
                         <div className="cpuActionBox--enemyInfo">
                              <h3>{this.props.cpuChoice.name}</h3>
                              <div className="hpInfo">
                                   <div className="hitBar">
                                        <p>HP</p>
                                        <div className="actionBox--healthBar" data-total="1000" data-value="1000">
                                             {/* <p>Attack: {this.props.cpuPower}</p> */}
                                             <div className="cpuBar" style={{
                                                                      width: this.props.percentCpuHp +'%',
                                                                      background: this.props.percentCpuHp >= 65 ? "green" : this.props.percentCpuHp >= 30 ? "#dfc532" : "#b82323", }}>
                                                  <div className="hit"></div>
                                             </div>
                                        </div>
                                   </div>
                                   <p> {this.props.cpuHp}/{this.props.cpuChoice.stats[5].base_stat}</p>
                              </div>
                         </div>
                         <div className="cpuActionBox--enemyPicture">

                              <img className={ this.props.cpuAnimated === true ? "animated" : null} src={this.props.cpuPic} alt={this.props.cpuChoice.name}/>
                         </div>
                    </div>
               </div>
          )
     }





}

export default CpuStage;