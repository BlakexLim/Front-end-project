interface StarShipName {
  name: string;
}

interface StarShipData {
  model: string;
  manufacturer: string;
  class: string;
  maxAtmSpd: number;
  hyperDriveRating: number;
  cost: number;
  fleetBtn: string;
}

const $starShip = document.querySelector('.ship-name');
if (!$starShip) throw new Error('$starship query failed');
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul query failed');
const $li = document.querySelector('li');
if (!$li) throw new Error('$li query failed');

// $starShip.addEventListener('click', (event: Event) => {
//   const $eventTarget = event.target as HTMLLIElement;
//   if ($eventTarget.tagName === 'LI') {
//    console.log($eventTarget.tagName);
//   }

const apiUrl = 'https://www.swapi.tech/api/starships/';

// fetch api data for name of starship
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.results.forEach((starship: StarShipName) => {
      getShipName(starship);
    });
    data.results.forEach((starship: StarShipData) => {
      getShipData(starship);
    });
  })
  .catch((error) => {
    console.error('Error', error);
  });

// render starship name on webpage
function getShipName(starship: StarShipName): void {
  const $shipName = document.createElement('li');
  $shipName.setAttribute('class', 'ship-name');
  $shipName.textContent = starship.name;
  $ul?.appendChild($shipName);
  console.log($shipName);
}

function getShipData(starship: StarShipData): void {
  const $shipModel = document.createElement('li');
  $shipModel.setAttribute('class', 'ship-data');
  $shipModel.textContent = starship.model;

  const $shipManufacturer = document.createElement('li');
  $shipManufacturer.setAttribute('class', 'ship-data');
  $shipManufacturer.textContent = starship.manufacturer;

  const $shipClass = document.createElement('li');
  $shipClass.setAttribute('class', 'ship-data');
  $shipClass.textContent = starship.class;

  const $shipMaxSpd = document.createElement('li');
  $shipMaxSpd.setAttribute('class', 'ship-data');
  $shipMaxSpd.value = starship.maxAtmSpd;

  const $shipHypDrive = document.createElement('li');
  $shipHypDrive.setAttribute('class', 'ship-data');
  $shipHypDrive.value = starship.hyperDriveRating;

  const $shipCost = document.createElement('li');
  $shipCost.setAttribute('class', 'ship-data');
  $shipCost.value = starship.cost;

  const $shipData = document.createElement('li');
  $shipData.setAttribute('class', 'ship-data');

  const $fleetBtn = document.createElement('button');
  $fleetBtn.setAttribute('class', 'add-to-fleet');
  $fleetBtn.textContent = 'Add to fleet';

  $ul?.appendChild($shipModel);
  $shipModel.append($shipManufacturer);
  $shipManufacturer.append($shipClass);
  $shipClass.append($shipMaxSpd);
  $shipMaxSpd.append($shipHypDrive);
  $shipHypDrive.append($shipCost);
  $shipCost.append($shipData);
  $shipData.appendChild($fleetBtn);
}
