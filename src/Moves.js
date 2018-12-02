import React, { Component } from 'react';

class Moves extends Component {


     render(){
          return(
               <div className="movesPanel">
                    <p>Make Your Move!</p>
                    <div className="moves">
                         {this.props.playerAttacks.map((attack) => {
                              return (
                                   <button className="move" disabled={this.props.isNotMyTurn()} onClick={this.props.attackExecuted} key={attack.move.name} id={attack.move.name} value={this.props.playerPower} >
                                        {attack.move.name}
                                   </button>

                                   )
                              })
                         }
                    </div>
                    
               </div>
              
          )

     }

}

export default Moves;