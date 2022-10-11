export default function (graphic) {

  //Define references to DOM elements
  const weightBox = document.getElementById('weight');
  const heightFeetBox = document.getElementById('height_feet');
  const heightInchesBox = document.getElementById('height_inches');
  const nameBox = document.getElementById('name');
  const dietBox = document.getElementById('diet');
  const whenBox = document.getElementById('when');
  const factBox = document.getElementById('fact');
  const inputForm = document.getElementById('form');

  //Bind button click to action
  document.getElementById('formButton').onclick = showDinosaurs;

  /**
  * @description Shows info graphics
  */
  function showDinosaurs() {
    const humanData = processInputData();
    inputForm.remove();
    graphic.show(humanData);
  }

  /**
  * @description Creates object containing user input
  * @returns {Object} human data
  */
  function processInputData() {
    let humanData = {};
    humanData.weight = getValidatedWeight();
    humanData.height = getValidatedHeight();
    humanData.name = nameBox.value || 'No name provided.';
    humanData.diet = dietBox.value;
    humanData.when = whenBox.value || 'No time period provided.';
    humanData.fact = factBox.value || 'No fact provided';
    return humanData;
  }

  /**
  * @description Validates user weight input
  * @returns {number} user input if valid, 0 if not
  */
  function getValidatedWeight() {
    const validWeight = Number(weightBox.value) ? Number(weightBox.value) : 0;
    return validWeight;
  }

  /**
  * @description Validates user height input
  * @returns {number} user input if valid, 0 if not
  */
  function getValidatedHeight() {

    const validFeet = Number(heightFeetBox.value) ? Number(heightFeetBox.value) : 0;
    const validInches = Number(heightInchesBox.value) ? Number(heightInchesBox.value) : 0;

    const heightInInches = validFeet * 12 + validInches;
    return heightInInches;

  }

}