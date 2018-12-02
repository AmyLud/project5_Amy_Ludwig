import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import images from './images'
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
      pokemonPics: images,
      playerPokemon: [], //List of options that can be chosen
      cpuPokemonIDs: [19, 16, 41, 10],
      cpuPokemon: [], //List of options that can be chosen
      
      //Player Pokemon choice, stats, moves
      playerChoice: {},
      playerChoicePic: {},
      playerStats: [],
      playerMoves: [],
      playerAttacks: [],
      playerHp: undefined,
      percentPlayerHp: 100,
      playerPower: undefined,
      playerUsed: "",
      playerAnimated: false,
      
      
      //Cpu choice, stats, moves
      cpuChoice: {},
      cpuChoicePic: {},
      cpuStats: [],
      cpuMoves: [],
      cpuAttacks: [],
      cpuHp: undefined,
      percentCpuHp: 100,
      cpuPower: undefined,
      cpuUsed: "",
      cpuAnimated: false,

      //Stuff for tracking 
      checkboxOptionSelected: undefined,

      //battle tracking states (turns, etc.)
      playerTurn: false,
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


  }  
  //---------------------ON CECKBOX SELECTION---------------------
  
    // checkboxSelected = ()=> {

    // }

  //---------------------ON SELECTION OF POKEMON---------------------

  setSelections = (e)=>{
    //player selection
    const newPlayerPokemon = Array.from(this.state.playerPokemon);
    const newList = newPlayerPokemon.filter(pokemon => pokemon.id === Number(e.target.id))
    const newPicList = Array.from(this.state.pokemonPics);
    const newPic = newPicList.filter((img) => img.id === Number(e.target.id))


    //CPU selection
    const newcpuPokemon = Array.from(this.state.cpuPokemon);
    const newCpuChoice = randomItem(newcpuPokemon);



    //Set states
    this.setState({
      checkboxOptionSelected: newList[0].id, 
      playerChoice: newList[0],
      playerChoicePic: newPic[0].backURL,
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

    const cpuPicList = Array.from(this.state.pokemonPics);
    const cpuPic = cpuPicList.filter((img) => img.id === Number(this.state.cpuChoice.id))


    //set states
    this.setState({ 
      cpuChoicePic: cpuPic[0].frontURL,
      playerAttacks: newAttacks,
      playerPower: Math.round((neededStats[0].base_stat)/10),
      playerHp: neededStats[1].base_stat,
      // percentPlayerHp: 
      cpuAttacks: newcpuAttacks,
      cpuPower: Math.round((cpuNeededStats[0].base_stat)/10),
      cpuHp: cpuNeededStats[1].base_stat,
      narrationPanel: `A wild ${this.state.cpuChoice.name} has appeared!`,
      gameinProgress: true,
      gameSetup: false,

    })

    setTimeout(()=> {
      this.setState({
        playerTurn: true,
      })
    }, 3000)
//once state for these things are set, we can start the game
  }
  
//---------------------  ---------------------

  attackExecuted = (e)=>{

    // what cpuhp is right now
    // figure out the attacks power
    let makeItLookRandom = Math.floor(Math.random() * 3);
    if (makeItLookRandom !== 0) {
      makeItLookRandom *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;}
      const dynamicAttackPower = Number(e.target.value) + Number(makeItLookRandom);
      console.log(dynamicAttackPower)

    // compare the power to the cpuhp 
      if (this.state.cpuHp - Number(dynamicAttackPower) <= 0) {

        this.setState({
          gameWon: true,
          battleComplete: true,
          gameinProgress: false,
        })
      }   else {
        this.setState({
          playerTurn: false,
        })
  
        this.setState({
          cpuAnimated: true,
          playerUsed: e.target.id,
          cpuHp: this.state.cpuHp - (dynamicAttackPower),
          percentCpuHp: Math.round(((this.state.cpuHp - (dynamicAttackPower)) /  this.state.cpuChoice.stats[5].base_stat)*100),
          
        })

        setTimeout(()=>{
          this.setState({
            cpuAnimated: false,

          })
        }, 2500)

        //set up narration for 
        if (this.state.playerTurn === true){
          this.setState({
            narrationPanel: Number(makeItLookRandom) === 2 ? `${this.state.playerChoice.name} has used ${e.target.id}! It's super affective!` : `${this.state.playerChoice.name} has used ${e.target.id}!`
          })
        } 
        
        this.delay();

      }

  }

//---------------------CPU ATTACKS---------------------

delay = () => {
  setTimeout(() => {
    this.cpuAttack()

  }, 3500);
  
}

cpuAttack= ()=>{


  const cpuAttackChoice = randomItem(this.state.cpuAttacks);
  const cpuAttackChoiceName = cpuAttackChoice.move.name;
  let makeItLookRandom = Math.floor(Math.random() * 3);
  if (makeItLookRandom !== 0) {
    makeItLookRandom *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
  }
  const dynamicAttackPower = Number(this.state.cpuPower) + Number(makeItLookRandom);



  if (this.state.playerHp - dynamicAttackPower <= 0) {
      this.setState({
      gameWon: false,
      battleComplete: true,
      gameinProgress: false,
    })
  }
  this.setState({
    playerAnimated: true,
    narrationPanel: Number(makeItLookRandom) === 2 ? `${this.state.cpuChoice.name} has used ${cpuAttackChoiceName}! It's super affective!`:`${this.state.cpuChoice.name} has used ${cpuAttackChoiceName}!`,
    playerHp: this.state.playerHp - dynamicAttackPower,
    percentPlayerHp: Math.round(((this.state.playerHp - dynamicAttackPower) / this.state.playerChoice.stats[5].base_stat) * 100),
  })

  //let player go after 1.5 seconds
  setTimeout(() => {
    this.setState({
      playerAnimated: false,
    })
  }, 2000);
  setTimeout(() => {
    this.setState({
      playerTurn: true,
    })
  }, 2500);

  

}

//---------------------RESET GAME FUNCTION---------------------

  returnToStart = ()=>{
    this.setState({
      percentCpuHp: 100,
      percentPlayerHp: 100,
      checkboxOptionSelected: undefined,
      playerChoice: {},
      cpuChoice: {},
      playerTurn: false,
      startGame: false, //controls start game button showing. will not show if no option selected
      gameSetup: true, //controls pokemon selection panel
      gameinProgress: false, //controls battlestage 
      gameWon: undefined, //controls what WinLose panel says
      battleComplete: false, //controls visibility of WinLosePanel
    })
  }


//---------------------HERE IS MY RENDER:---------------------
  render() {
    // this.checkWinLose();
    return (
      <div className="App">
      <div className="headerBar">
          <h1>Poké-Gym</h1>

      </div>

       { this.state.gameSetup === true ?
          <PokemonSelect 
        passAllValues={this.passValues} 
        setSelections={this.setSelections}
        playerPokemon={this.state.playerPokemon} 
        startGame={this.state.startGame}
        playerPokemonPics={this.state.pokemonPics}
        checkboxOptionSelected={this.state.checkboxOptionSelected}/> : null}

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
      playerPic={this.state.playerChoicePic}
      cpuPic={this.state.cpuChoicePic}
      percentCpuHp={this.state.percentCpuHp}
      percentPlayerHp={this.state.percentPlayerHp}
      playerAnimated={this.state.playerAnimated}
      cpuAnimated={this.state.cpuAnimated}
      /> : null} 
   

        { this.state.battleComplete === true ?
        <WinLose 
        cpuChoice={this.state.cpuChoice} 
        playerChoice={this.state.playerChoice} 
        gameWon={this.state.gameWon}
        returnToStart={this.returnToStart}
        
        /> : null}

      </div>
    );
  }
}

export default App;
