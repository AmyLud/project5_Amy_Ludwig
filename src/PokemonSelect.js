import React, { Component } from 'react';
import './PokemonSelect.css';



class PokemonSelect extends Component {



     // const checkedOption = 
     // document.getElementByID()




     render(){
          return(
               <section className="pokemonSelection">
                    <div className="wrapper">
                         <h2>Choose your Pokemon!</h2>
                         <form action="#" onSubmit={this.props.passAllValues}>
                              <div className="pokemonSelection--options">
                                   {this.props.playerPokemon.map((pokemon)=>{
                                        const choicePic = this.props.playerPokemonPics.filter(picObject => picObject.id === pokemon.id)
                                        return(
                                             <div  className="pokemonSelection--option" key={pokemon.id}>
                                                  <input type="radio" id={pokemon.id} name="pokemon" className="pokemonSelection--input" onChange={this.props.setSelections} ></input>
                                                       <label htmlFor={pokemon.id}>
                                                       {/* <p>{pokemon.name}</p> */}
                                                       <div className={this.props.checkboxOptionSelected === pokemon.id ? "pokemonSelection--img--selected pokemonSelection--img" : "pokemonSelection--img"} >
                                                                      <img className="color" src={choicePic[0].frontURL} alt={pokemon.name}/>
                                                                      <img className="monochrome" src={choicePic[0].frontURLBW} alt={pokemon.name}/>
                                                                 </div>
                                                            
                                                       </label>
                                                  </div>
                                             )
                                        })}
                              </div>
                              <div className="pokemonSelection--startSection">
                                   {this.props.startGame === false ? null : <input className="pokemonSelection--StartButton" type="submit" value="Battle!"/> } 
                              </div>
                         </form>
                    </div>
               </section>
          )
     }





}

export default PokemonSelect;