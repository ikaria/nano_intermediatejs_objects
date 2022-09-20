import data from '../dino.json';

export default function () {

  //TO DO: add function description and variable types

  const dinoData = data.Dinos;
  let human;

  /*PUBLIC*/
  function show(humanData) {
    human = humanData;
    const infoGraphicContainer = document.querySelector('#infoGraphic');
    const displayData = createDisplayData();
    populateHTMLWithData(displayData, infoGraphicContainer);
  }

  /*PRIVATE*/
  function createDisplayData() {

    //empty array for 9 slots
    let displayData = new Array(9).fill(101);

    const humanInfo = createCustomInfo(human.name, 'human', '&nbsp');
    const birdInfo = createCustomInfo('Pigeon', 'pigeon', 'All dinosaurs are birds');

    //reserve middle spot for human
    displayData[4] = humanInfo;

    //random slot for pigeon
    const birdSlot = getNextAvailableRandomSlot(displayData);
    displayData[birdSlot] = birdInfo;

    //fill remaining slots for dinos
    for (let i = 0; i < 7; i++) {
      const availableSlot = getNextAvailableRandomSlot(displayData);
      displayData[availableSlot] = createDinoInfo(i);
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

  function createDinoInfo(dinoId) {
    const dinoObject = {};
    dinoObject.title = dinoData[dinoId].species;
    dinoObject.image = dinoData[dinoId].species;
    dinoObject.fact = getRandomFact(dinoId);
    return dinoObject;
  }

  function createCustomInfo(name, image, fact) {
    return {
      title: name,
      image: image,
      fact: fact
    };
  }

  function getRandomFact(dinoId) {
    const dino = dinoData[dinoId];
    const facts = {
      0: compareWeight(human.weight, dino),
      1: compareHeight(human.height, dino),
      2: compareDiet(human.diet, dino),
      3: describeHabitat(dino),
      4: describeTimePeriod(dino),
      5: dino.fact
    };

    const randomFactID = Math.floor(Math.random() * 6);
    const randomFact = facts[randomFactID];

    return randomFact;
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

  function describeTimePeriod(dino) {
    return `${dino.species} lived during the ${dino.when} period`;
  }

  function describeHabitat(dino) {
    return `${dino.species} lived in ${dino.where}`;
  }

  function compareWeight(humanWeight, animal) {
    let comparisonResult;

    if (humanWeight > animal.weight) {
      comparisonResult = `${animal.species} was ${humanWeight - animal.weight} pounds lighter than you`;
    } else if (humanWeight < animal.weight) {
      comparisonResult = `${animal.species} was ${animal.weight - humanWeight} pounds heavier than you`;
    } else {
      comparisonResult = `${animal.species} was the same weight as you`;
    }
    return comparisonResult;
  }

  function compareHeight(humanHeight, animal) {
    let comparisonResult;

    if (humanHeight > animal.height) {
      comparisonResult = `${animal.species} was ${humanHeight - animal.height} inches shorter than you`;
    } else if (humanHeight < animal.height) {
      comparisonResult = `${animal.species} was ${animal.height - humanHeight} inches taller than you`;
    } else {
      comparisonResult = `${animal.species} was the same height as you`;
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
      comparisonResult = `You have the same diet as ${animal.species}`;
    } else {
      comparisonResult = `Unlike you, ${animal.species} was a ${animal.diet}`;
    }

    return comparisonResult;
  }

  return {
    show: show
  };

}