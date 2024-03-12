interface StarShipName {
  name: string;
}

interface StarShipData {
  model: string;
  manufacturer: string;
  class: string;
  maxAtmSpd: string;
  hyperDriveRating: string;
  cost: string;
  fleetBtn: string;
}

const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul query failed');
const $rundown = document.querySelector('.rundown');
if (!$rundown) throw new Error('$rundown query failed');
const $model = document.getElementsByClassName('.model');
if (!$model) throw new Error('$model query failed');

const apiUrl = 'https://www.swapi.tech/api/starships/';
const shipArr: object[] = [];
// fetch api data for starship
// retrieve data, store response in array
// loop thru array to cross ref id and starship name
// if id and name matches, get properties of that starship
async function getStarShip(): Promise<void> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`${response.status} failed to fetch data`);
    }
    const data = await response.json();
    data.results.forEach((starship: StarShipName) => {
      $ul?.appendChild(getShipName(starship));
    });
    data.results.forEach((starship: StarShipData) => {
      $rundown?.append(getShipData(starship));
      shipArr.push(starship);
    });
  } catch (error) {
    console.error('Error fetching data');
    throw error;
  }
}
getStarShip();
console.log(shipArr);
// render starship name on webpage
function getShipName(starship: StarShipName): HTMLLIElement {
  const $shipName = document.createElement('li');
  $shipName.setAttribute('class', 'ship-name');
  $shipName.textContent = starship.name;
  return $shipName;
}

// render starship data on webpage
function getShipData(starship: StarShipData): HTMLLIElement {
  const $shipContainer = document.createElement('li');
  $shipContainer.setAttribute('class', 'ship-data ship-name');

  const $shipModel = document.createElement('p');
  $shipModel.textContent = starship.model;

  const $shipManufacturer = document.createElement('p');
  $shipManufacturer.textContent = starship.manufacturer;

  const $shipClass = document.createElement('p');
  $shipClass.textContent = starship.class;

  const $shipMaxSpd = document.createElement('p');
  $shipMaxSpd.textContent = starship.maxAtmSpd;

  const $shipHypDrive = document.createElement('p');
  $shipHypDrive.textContent = starship.hyperDriveRating;

  const $shipCost = document.createElement('p');
  $shipCost.textContent = starship.cost;

  const $fleetBtn = document.createElement('button');
  $fleetBtn.setAttribute('class', 'add-to-fleet');
  $fleetBtn.textContent = 'Add to fleet';

  $shipContainer.appendChild($shipModel);
  $shipContainer.append($shipManufacturer);
  $shipContainer.append($shipClass);
  $shipContainer.append($shipMaxSpd);
  $shipContainer.append($shipHypDrive);
  $shipContainer.append($shipCost);
  $shipContainer.append($fleetBtn);
  return $shipContainer;
}

async function selectShip(uid: number): Promise<void> {
  const shipApi = `https://www.swapi.tech/api/starships/${uid}`;
  console.log(shipApi);
  try {
    const response = await fetch(shipApi);
    if (!response.ok) {
      throw new Error(`Failed to fetch property with ID ${uid}`);
    }
    const propertyData = await response.json();
    return propertyData;
  } catch (error) {
    console.error('Error fetching property data');
    throw error;
  }
}

$ul?.addEventListener('click', (event: Event) => {
  // const $eventTarget = event.target
  console.log(event.target);
  // for (let i = 0; i < shipArr.length; i++) {
  //   if (shipArr[i] === $eventTarget) {

  //   }
  // }
  selectShip(2);
});
