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
const $li = document.querySelector('li');
if (!$li) throw new Error('$li query failed');
const $renderedLi = document.querySelector('.ship-name');
if (!$renderedLi) throw new Error('$renderedLi query failed');
const $rundown = document.querySelector('.rundown');
if (!$rundown) throw new Error('$rundown query failed');
const $model = document.getElementsByClassName('.model');
if (!$model) throw new Error('$model query failed');

const apiUrl = 'https://www.swapi.tech/api/starships/';

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
    // let shipArr: Object[] = []
    const data = await response.json();
    data.results.forEach((starship: StarShipName) => {
      $ul?.appendChild(getShipName(starship));
      // shipArr.push(getShipName(starship));
    });
    // console.log(shipArr)
    // for (let i = 0; i < shipArr.length; i++) {
    //   if (shipArr[i] === response) {

    //   }
    // }
    data.results.forEach((starship: StarShipData) => {
      console.log(starship);
      $rundown?.append(getShipData(starship));
    });
  } catch (error) {
    console.error('Error fetching data');
    throw error;
  }
}
getStarShip();

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
  $shipMaxSpd.textContent = starship.maxAtmSpd.toString();

  const $shipHypDrive = document.createElement('p');
  $shipHypDrive.textContent = starship.hyperDriveRating.toString();

  const $shipCost = document.createElement('p');
  $shipCost.textContent = starship.cost.toString();

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
selectShip(2);

$ul.addEventListener('click', (event: Event) => {
  console.log(event.target);
});
