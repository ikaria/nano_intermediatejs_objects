export default function (graphic) {

  const weightBox = document.getElementById('weight');
  const heightFeetBox = document.getElementById('height_feet');
  const heightInchesBox = document.getElementById('height_inches');
  const nameBox = document.getElementById('name');
  const dietBox = document.getElementById('diet');
  const whenBox = document.getElementById('when');
  const factBox = document.getElementById('fact');
  const inputForm = document.getElementById('form');

  document.getElementById('formButton').onclick = showDinosaurs;

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
    const validWeight = Number(weightBox.value) ? Number(weightBox.value) : 0;
    return validWeight;
  }

  function getValidatedHeight() {

    const validFeet = Number(heightFeetBox.value) ? Number(heightFeetBox.value) : 0;
    const validInches = Number(heightInchesBox.value) ? Number(heightInchesBox.value) : 0;

    const heightInInches = validFeet * 12 + validInches;
    return heightInInches;

  }

}