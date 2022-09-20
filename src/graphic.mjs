import data from '../dino.json';

export default function () {

  const dinoData = data.Dinos;
  let human;

  /*PUBLIC*/

  /**
  * @description Adds graphic containing comparison of user input to dinosaur json data to the DOM
  * @param {Object} humanData Object containing user data
  */
  function show(humanData) {
    human = humanData;
    const infoGraphicContainer = document.querySelector('#info-graphic');
    const displayData = createDisplayData();
    populateHTMLWithData(displayData, infoGraphicContainer);
  }

  /*PRIVATE*/

  /**
  * @description Creates array containing user input
  * @returns {Array} Contains (9) data objects corresponding to (9) grid boxes
  */
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

  /**
  * @description Picks a random available grid slot and returns it
  * @param {Array} displayData array of data objects representing current grid state
  * @returns {number} Returns an empty slot location as a number from 0 to 8
  */
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


  /**
  * @description Creates a dino data object from s json object
  * @param {number} dinoId json array data reference to specific dinosaur
  * @returns {Object} Returns formatted object containing json data for specific dinosaur
  */
  function createDinoInfo(dinoId) {
    const dinoObject = {};
    dinoObject.title = dinoData[dinoId].species;
    dinoObject.image = dinoData[dinoId].species;
    dinoObject.fact = getRandomFact(dinoId);
    return dinoObject;
  }

  /**
  * @description Creates a custom data object
  * @param {string} name
  * @param {string} image image name without extension
  * @param {string} fact
  * @returns {Object} Returns formatted object containing custom data
  */
  function createCustomInfo(name, image, fact) {
    return {
      title: name,
      image: image,
      fact: fact
    };
  }

  /**
  * @description Returns a random fact about a dinosaur
  * @param {number} dinoId
  * @returns {string} Stored or calculated fact for a particular dinosaur
  */
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

  /**
  * @description Populates an HTML element with a div containing a title, an image and a fact
  * @param {object} data Array containing (9) data objects
  * @param {element} element HTML to host the div
  * @returns {string} Stored or calculated fact for a particular dinosaur
  */
  function populateHTMLWithData(data, element) {
    for (let i = 0; i < 9; i++) {
      element.insertAdjacentHTML('beforeend',
        `<div class="info-item">
        <h3 class="info-title"> ${data[i].title}</h3>
        <img class="info-image" src="./images/${data[i].image}.png">
        <p class="infoFact">${data[i].fact}</p>
      </div>`);
    }
  }

  /**
  * @description Formats dinosaur 'when' fact as a string
  * @param {Object} dino complete dino object
  * @returns {string} full sentence describing a location
  */
  function describeTimePeriod(dino) {
    return `${dino.species} lived during the ${dino.when} period`;
  }

  /**
  * @description Formats dinosaur 'where' fact as a string
  * @param {Object} dino complete dino object
  * @returns {string} full sentence describing a time period
  */
  function describeHabitat(dino) {
    return `${dino.species} lived in ${dino.where}`;
  }

  /**
  * @description Formats dinosaur 'weight' fact as a string
  * @param {number} humanWeight user supplied weight in lbs
  * @param {Object} animal complete dino object
  * @returns {string} full sentence comparing user weight to dinosaur data provided as animal
  */
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

  /**
  * @description Formats dinosaur 'height' fact as a string
  * @param {number} humanHeight user supplied height in inches
  * @param {Object} animal complete dino object
  * @returns {string} full sentence comparing user height to dinosaur data provided as animal
  */
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

  /**
  * @description Formats dinosaur 'diet' fact as a string
  * @param {number} humanDiet user supplied diet: omnivore, herbivore or carnivore
  * @param {Object} animal complete dino object
  * @returns {string} full sentence comparing user diet to dinosaur data provided as animal
  */
  function compareDiet(humanDiet, animal) {

    let comparisonResult;

    //correct typo in json data
    if (animal.diet == 'herbavor') {
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