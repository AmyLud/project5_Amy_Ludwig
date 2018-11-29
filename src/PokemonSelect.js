import React, { Component } from 'react';
import './PokemonSelect.css';



class PokemonSelect extends Component {





     render(){
          return(
               <div className="pokemonSelection">
                    <h2>Pokemon selection</h2>
                    <form action="#" onSubmit={this.props.passAllValues}>
                    
                         {this.props.playerPokemon.map((pokemon)=>{
                              return(
                                   <div className="pokemonSelection--option" key={pokemon.id}>
                                        <input type="radio" id={pokemon.id} name="pokemon" onChange={this.props.setSelections}></input>
                                             <label htmlFor={pokemon.id}>{pokemon.name}
                                                   
                                                       {/* <img src="https://fillmurray.com/200/200" alt=""/> */}
                                                   
                                             </label>
                                        </div>
                                   )
                              })}

                         <div>
                             {
                                   this.props.startGame === false ? <p>Choose your Pokemon!</p> :<input type="submit" value="Battle!" /> 
                             } 
                         </div>
                    </form>
                    
               </div>
          )
     }





}

export default PokemonSelect;