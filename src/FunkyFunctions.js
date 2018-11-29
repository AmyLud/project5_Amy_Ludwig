

export function randomItem (array) {
     return array[Math.floor(Math.random() * array.length)]
}


export function shuffleArray (a) {
     for (let i = a.length - 1; i > 0; i--) { //repeats for every item of the array
          const j = Math.floor(Math.random() * (i + 1)); //generates new random indexes
          [a[i], a[j]] = [a[j], a[i]]; // takes indexes and replaces them random ones
     }
     return a;
}   