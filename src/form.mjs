export default function () {

  function create() {
    console.log('form created');
    return 5;
  }

  return {
    create: create
  };

}