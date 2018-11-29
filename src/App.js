import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import PokemonSelect from './PokemonSelect';
import Battlestage from './BattleStage';
import { shuffleArray, randomItem } from './FunkyFunctions';
import WinLose from './WinLose';



//GLOBAL STUFF
const pokeapp = {};
pokeapp.pokeUrl = 'https://pokeapi.co/api/v2/pokemon';


class App extends Component {

//---------------------STATES:---------------------

  constructor(){
    super();
    this.state = {
      playerPokemonIDs: [1, 4, 7, 25],
      playerPokemon: [], //List of options that can be chosen
      cpuPokemonIDs: [19, 52, 41, 10],
      cpuPokemon: [], //List of options that can be chosen

      //Player Pokemon choice, stats, moves
      playerChoice: {},
      playerStats: [],
      playerMoves: [],
      playerAttacks: [],
      playerHp: [],
      playerPower: [],
      playerUsed: "",


      //Cpu choice, stats, moves
      cpuChoice: {},
      cpuStats: [],
      cpuMoves: [],
      cpuAttacks: [],
      cpuHp: [],
      cpuPower: [],
      cpuUsed: "",

      //battle tracking states (turns, etc.)
      playerTurn: true,
      cpuTurn: false,
      narrationPanel: "",

      //visibility states:
      startGame: false, //controls start game button showing. will not show if no option selected
      gameWon: false,
      gameLost: false,


    }
  }

  //---------------------SUMMON THE POKEMON!---------------------

  componentDidMount(){
    //Call pokemon for player.
    this.state.playerPokemonIDs.map((id) => {
      return axios({
        method: 'GET',
        url: `${pokeapp.pokeUrl}/${id}/`
      }, { params: {} })
        .then((res) => {
          // console.log(res.data)
          const newPlayerPokemon = Array.from(this.state.playerPokemon);
          newPlayerPokemon.push(res.data);
          this.setState({
            playerPokemon: newPlayerPokemon,
          })

        });
    });

    this.state.cpuPokemonIDs.map((id) => {
      return axios({
        method: 'GET',
        url: `${pokeapp.pokeUrl}/${id}/`
      }, { params: {} })
        .then((res) => {
          // console.log(res.data)
          const newCpuPokemon = Array.from(this.state.cpuPokemon);
          newCpuPokemon.push(res.data);
          this.setState({
            cpuPokemon: newCpuPokemon,
          })

        });
    });

    // if (cpuHp <= 0) {
    //   this.setState({
    //     gameWon: true,
    //     gameLost: false,
    //   })
    // } else if (playerHp <= 0){
    //   this.setState({
    //     gameWon: false,
    //     gameLost: true,
    //   })
    // }
  }  

  //---------------------ON SELECTION OF POKEMON---------------------

  setSelections = (e)=>{
    //player selection
    const newPlayerPokemon = Array.from(this.state.playerPokemon);
    const newList = newPlayerPokemon.filter(pokemon => pokemon.id === Number(e.target.id))
    //CPU selection
    const newcpuPokemon = Array.from(this.state.cpuPokemon);
    const newCpuChoice = randomItem(newcpuPokemon);
    //Set states
    this.setState({
      playerChoice: newList[0],
      playerStats: newList[0].stats,
      playerMoves: newList[0].moves,
      cpuChoice: newCpuChoice,
      cpuMoves: newCpuChoice.moves,
      cpuStats: newCpuChoice.stats,
      startGame: true, //once option chosen, can't unchoose (radio bubble). good to show button.
    })
   
  }

  //---------------------ON CLICK OF START GAME---------------------

  passValues = (e)=>{
    e.preventDefault();
    //give me 4 random attacks for player
    const newPlayerMoves = Array.from(this.state.playerMoves);
    shuffleArray(newPlayerMoves);
    const newAttacks = newPlayerMoves.slice(0, 4);
    //give me stats for player
    const newStats = Array.from(this.state.playerStats);
    const neededStats = newStats.slice(4);
    //give me 4 random attacks from cpu
    const newCpuMoves = Array.from(this.state.cpuMoves)
    shuffleArray(newCpuMoves);
    const newcpuAttacks = newCpuMoves.slice(0, 4);
    //give me stats for cpu
    const newCpuStats = Array.from(this.state.cpuStats);
    const cpuNeededStats = newCpuStats.slice(4);
    //set states
    this.setState({
      playerAttacks: newAttacks,
      playerPower: Math.round((neededStats[0].base_stat)/10),
      playerHp: neededStats[1].base_stat,
      cpuAttacks: newcpuAttacks,
      cpuPower: Math.round((cpuNeededStats[0].base_stat)/10),
      cpuHp: cpuNeededStats[1].base_stat,
      narrationPanel: `A wild ${this.state.cpuChoice.name} has appeared!`

    })
//once state for these things are set, we can start the game
  }
  
//---------------------  ---------------------

  attackExecuted = (e)=>{
      // give me a random number out of 1, 0 and -1. this will help it appear as though it's more dynamic. always having the same hits isn't very fun
      let makeItLookRandom = Math.floor(Math.random() * 2);
      if (makeItLookRandom !== 0) {
        makeItLookRandom *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;}
        const dynamicAttackPower = Number(e.target.value) + Number(makeItLookRandom);


      //make it say stuff lol
      this.setState({
        playerUsed: e.target.id,
        cpuHp: this.state.cpuHp - (dynamicAttackPower)
      })
      //set up narration for 
      if (this.state.playerTurn === true){
        this.setState({
          narrationPanel: `${this.state.playerChoice.name} has used ${e.target.id}!`
        })
      } 

      this.delay(); 


  }

//---------------------CPU ATTACKS---------------------

delay = () => {
  setTimeout(() => {
    this.cpuAttack()

  }, 2000);
  
}

cpuAttack= ()=>{
  
  const cpuAttackChoice = randomItem(this.state.cpuAttacks);
  const cpuAttackChoiceName = cpuAttackChoice.move.name;
  this.setState({
    narrationPanel: `${this.state.cpuChoice.name} has used ${cpuAttackChoiceName}!`
  })

}


//---------------------HERE IS MY RENDER:---------------------
  render() {
    return (
      <div className="App">
        <h1>Pokeman lulz</h1>
        <PokemonSelect passAllValues={this.passValues} setSelections={this.setSelections} playerPokemon={this.state.playerPokemon} startGame={this.state.startGame}/>

        <Battlestage  
        playerChoice={this.state.playerChoice} 
        playerAttacks={this.state.playerAttacks} 
        playerHp={this.state.playerHp} 
        playerPower={this.state.playerPower} 
        cpuChoice={this.state.cpuChoice} 
        cpuAttacks={this.state.cpuAttacks} 
        cpuHp={this.state.cpuHp} 
        cpuPower={this.state.cpuPower}
        attackExecuted={this.attackExecuted}
        narrationPanel={this.state.narrationPanel}/>

        <WinLose 
        cpuChoice={this.state.cpuChoice} 
        playerChoice={this.state.playerChoice} 
        playerHp={this.state.playerHp} 
        cpuHp={this.state.cpuHp} 
        />

      </div>
    );
  }
}

export default App;
