import mGraphic from './src/graphic';

(function () {

  const weightBox = document.getElementById('weight');
  const heightFeetBox = document.getElementById('height_feet');
  const heightInchesBox = document.getElementById('height_inches');
  const nameBox = document.getElementById('name');
  const dietBox = document.getElementById('diet');
  const whenBox = document.getElementById('when');
  const factBox = document.getElementById('fact');
  const inputForm = document.getElementById('form');

  document.getElementById('formButton').onclick = showDinosaurs;

  const graphic = new mGraphic();

  function showDinosaurs() {
    const humanData = processInputData();
    inputForm.remove();
    graphic.show(humanData);
  }

  function processInputData() {
    let humanData = {};
    humanData.weight = getValidatedWeight();
    humanData.height = getValidatedHeight();
    humanData.name = nameBox.value || 'No name provided.';
    humanData.diet = dietBox.value;
    humanData.when = whenBox.value || 'No time period provided.';
    humanData.fact = factBox.value || 'No fact provided';
    console.log(humanData);
    return humanData;
  }

  function getValidatedWeight() {
    if (typeof (weightBox.value) == 'number' && weightBox.value > 0)
      return weightBox.value;
    return 0;
  }

  function getValidatedHeight() {
    let validFeet = 0;
    let validInches = 0;

    if (heightFeetBox.value == 'string' && parseInt(heightFeetBox.value) != NaN) {
      heightFeetBox.value = parseInt(heightFeetBox.value);
    }

    if (typeof (heightFeetBox.value) == 'number' && heightFeetBox.value > 0) {
      validFeet = heightFeetBox.value;
    }

    if (heightInchesBox.value == 'string' && parseInt(heightInchesBox.value) != NaN) {
      heightInchesBox.value = parseInt(heightInchesBox.value);
    }

    if (typeof (heightInchesBox.value) == 'number' && heightInchesBox.value > 0) {
      validInches = heightInchesBox.value;
    }

    if (validFeet || validInches) {
      const heightInInches = validFeet * 12 + validInches;
      return heightInInches;
    }

    return 0;
  }

})();