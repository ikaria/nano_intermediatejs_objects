
import data from '../dino.json';

export default function () {

  const dinoData = data.Dinos;

  /*PUBLIC*/
  function show(humanData) {
    const infoGraphicContainer = document.querySelector('#infoGraphic');
    const displayData = createDisplayData(humanData);
    populateHTMLWithData(displayData, infoGraphicContainer);
    //change grid visible = 1
  }

  /*PRIVATE*/
  function createDisplayData(humanData) {
    //set human data as element #5
    //use data loaded up front from json
    //run comparisons between human + json data i.e. if not #5, createDino

    let displayData = new Array(9).fill(101);

    //create human
    const human = {
      title: 'Human',
      image: 'human',
      fact: 'He\'s human, it\'s a fact'
    };

    //create bird
    const bird = {
      title: 'Bird',
      image: 'pigeon',
      fact: 'All dinos are birds'
    };

    displayData[4] = human;

    const birdSlot = getNextAvailableRandomSlot(displayData);
    displayData[birdSlot] = bird;

    for (let i = 0; i < 7; i++) {
      const availableSlot = getNextAvailableRandomSlot(displayData);
      displayData[availableSlot] = createDino(i);
    }

    return displayData;
  }

  function getNextAvailableRandomSlot(displayData) {
    let openSlot = -1;

    while (openSlot < 0) {
      let randomSlot = Math.floor(Math.random() * 9);
      if (displayData[randomSlot] === 101) {
        openSlot = randomSlot;
      }
    }

    return openSlot;
  }

  function createDino(whichDino) {
    const dinoObject = {};
    dinoObject.title = dinoData[whichDino].species;
    dinoObject.image = dinoData[whichDino].species;
    dinoObject.fact = dinoData[whichDino].fact;
    return dinoObject;
  }

  function populateHTMLWithData(data, element) {
    for (let i = 0; i < 9; i++) {
      element.insertAdjacentHTML('beforeend',
        `<div class="infoItem">
        <h3 class="infoTitle"> ${data[i].title}</h3>
        <img class="infoImage" src="./images/${data[i].image}.png">
        <p class="infoFact">${data[i].fact}</p>
      </div>`);
    }
  }

  //INHERIT FROM ONE COMPARISON FUNCTION!!

  function compareWeight(humanWeight, animal) {
    let comparisonResult;

    if (humanWeight > animal.weight) {
      comparisonResult = `${animal.name} is ${humanWeight - animal.weight} pounds lighter than you.`;
    } else if (humanWeight < animal.weight) {
      comparisonResult = `${animal.name} is ${humanWeight - animal.weight} pounds heavier than you.`;
    } else {
      comparisonResult = `${animal.name} is the same weight as you.`;
    }
    return comparisonResult;
  }

  function compareHeight(humanHeight, animal) {
    let comparisonResult;

    if (humanHeight > animal.height) {
      comparisonResult = `${animal.name} is ${humanHeight - animal.height} inches shorter than you.`;
    } else if (humanHeight < animal.height) {
      comparisonResult = `${animal.name} is ${humanHeight - animal.height} inches taller than you.`;
    } else {
      comparisonResult = `${animal.name} is the same height as you.`;
    }
    return comparisonResult;
  }

  function compareDiet(humanDiet, animal) {

    let comparisonResult;

    //correct typo in json data
    if (animal.diet === 'herbavore') {
      animal.diet = 'herbivore';
    }

    if (animal.diet === humanDiet) {
      comparisonResult = `You have the same diet as ${animal.name}`;
    } else {
      comparisonResult = `Unlike you, ${animal.name} is a ${animal.diet}.`;
    }

    return comparisonResult;
  }

  return {
    show: show
  };

}