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
      playerHp: undefined,
      playerPower: undefined,
      playerUsed: "",


      //Cpu choice, stats, moves
      cpuChoice: {},
      cpuStats: [],
      cpuMoves: [],
      cpuAttacks: [],
      cpuHp: undefined,
      cpuPower: undefined,
      cpuUsed: "",

      //battle tracking states (turns, etc.)
      playerTurn: true,
      narrationPanel: "",

      //visibility states:
      startGame: false, //controls start game button showing. will not show if no option selected

      gameSetup: true, //controls pokemon selection panel
      gameinProgress: false, //controls battlestage 
      gameWon: undefined, //controls what WinLose panel says
      battleComplete: false, //controls visibility of WinLosePanel



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

    // this.checkWinLose()
    // if (this.state.startGame === true && this.state.cpuHp <= "0"){
    //   console.log("yay")
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
      narrationPanel: `A wild ${this.state.cpuChoice.name} has appeared!`,
      gameinProgress: true,
      gameSetup: false,

    })
//once state for these things are set, we can start the game
  }
  
//---------------------  ---------------------

  attackExecuted = (e)=>{

      this.setState({
        playerTurn: false,
      })
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
  let makeItLookRandom = Math.floor(Math.random() * 2);
  if (makeItLookRandom !== 0) {
    makeItLookRandom *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
  }
  const dynamicAttackPower = Number(this.state.cpuPower) + Number(makeItLookRandom);

  this.setState({
    narrationPanel: `${this.state.cpuChoice.name} has used ${cpuAttackChoiceName}!`,
    playerHp: this.state.playerHp - dynamicAttackPower,
  })

  //let player go after 1.5 seconds
  setTimeout(() => {
    this.setState({
      playerTurn: true,
    })
  }, 1500);

}

//---------------------RESET GAME FUNCTION---------------------

  returnToStart = ()=>{
    console.log("RESTARTED")
    this.setState({
      playerChoice: {},
      cpuChoice: {},
      startGame: false, //controls start game button showing. will not show if no option selected
      gameSetup: true, //controls pokemon selection panel
      gameinProgress: false, //controls battlestage 
      gameWon: undefined, //controls what WinLose panel says
      battleComplete: false, //controls visibility of WinLosePanel
    })
  }

 //---------------------IF HP OF PLAYER OR CPU IS 0---------------------

  checkWinLose = () => {
    if (this.state.gameinProgress === true && Number(this.state.cpuHp) <= 0) {
      console.log("you win!")
    } else if (this.state.gameinProgress === true && Number(this.state.playerHp) <= 0){
      console.log("you lose!")
    }
  }



componentDidUpdate(){

    this.checkWinLose();

}

//---------------------HERE IS MY RENDER:---------------------
  render() {
    return (
      <div className="App">
        <h1>Pokeman lulz</h1>

       { this.state.gameSetup === true ?
          <PokemonSelect 
        passAllValues={this.passValues} 
        setSelections={this.setSelections}
        playerPokemon={this.state.playerPokemon} 
        startGame={this.state.startGame}/> : null}

      { this.state.gameinProgress === true ?
      
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
      narrationPanel={this.state.narrationPanel}
      playerTurn={this.state.playerTurn} 
      checkWinLose={this.state.checkWinLose}/> : null} 
   

        { this.state.battleComplete === true ?
        
        <WinLose 
        cpuChoice={this.state.cpuChoice} 
        playerChoice={this.state.playerChoice} 
        playerHp={this.state.playerHp} 
        cpuHp={this.state.cpuHp} 
        returnToStart={this.returnToStart}
        /> : null}

      </div>
    );
  }
}

export default App;
