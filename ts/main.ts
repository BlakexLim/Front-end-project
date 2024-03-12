interface StarShipName {
  uid: string;
  name: string;
}

interface StarShipData {
  uid: string;
  model: string;
  manufacturer: string;
  starship_class: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  cost_in_credits: string;
  fleetBtn: string;
}

const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul query failed');
const $rundown = document.querySelector('.rundown');
if (!$rundown) throw new Error('$rundown query failed');
const $model = document.getElementsByClassName('.model');
if (!$model) throw new Error('$model query failed');

const apiUrl = 'https://www.swapi.tech/api/starships/';

// fetch api data for starship
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
      getShipData(starship);
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
  $shipName.setAttribute('data-uid', starship.uid);
  $shipName.textContent = starship.name;
  return $shipName;
}

// render starship data on webpage
function getShipData(starship: StarShipData): HTMLLIElement {
  const $shipContainer = document.createElement('li');
  $shipContainer.setAttribute('class', 'ship-data');
  $shipContainer.setAttribute('data-uid', starship.uid);

  const $shipModel = document.createElement('p');
  $shipModel.textContent = `Model: ${starship.model}`;

  const $shipManufacturer = document.createElement('p');
  $shipManufacturer.textContent = `Manufacturer: ${starship.manufacturer}`;

  const $shipClass = document.createElement('p');
  $shipClass.textContent = `Class: ${starship.starship_class}`;

  const $shipMaxSpd = document.createElement('p');
  $shipMaxSpd.textContent = `Max Atmospheric Speed: ${starship.max_atmosphering_speed}`;

  const $shipHypDrive = document.createElement('p');
  $shipHypDrive.textContent = `HyperDrive Rating: ${starship.hyperdrive_rating}`;

  const $shipCost = document.createElement('p');
  $shipCost.textContent = `Cost: ${starship.cost_in_credits}`;

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

// fetch data for specific ship
async function selectShip(uid: string): Promise<void> {
  const shipApi = `https://www.swapi.tech/api/starships/${uid}`;
  try {
    const response = await fetch(shipApi);
    if (!response.ok) {
      throw new Error(`Failed to fetch property with ID ${uid}`);
    }
    const propertyData = await response.json();
    $rundown?.appendChild(getShipData(propertyData.result.properties));
  } catch (error) {
    console.error('Error fetching property data');
    throw error;
  }
}

$ul?.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLLIElement;
  const $ships = document.querySelectorAll('.ship-name');
  const $data = document.querySelectorAll('.ship-data');
  if (!$ships) throw new Error('$ships query failed');
  if (!$data) throw new Error('$data query failed');

  if ($eventTarget.tagName === 'LI') {
    const eventAttr = $eventTarget.getAttribute('data-uid');
    if (!eventAttr) return;
    selectShip(eventAttr);
    console.log(eventAttr);
    // Change text color of selected ship to yellow
    for (let i = 0; i < $ships.length; i++) {
      if ($ships[i] === $eventTarget) {
        $ships[i].className = 'ship-name show-clicked';
      } else {
        $ships[i].className = 'ship-name';
      }
    }
    for (let i = 0; i < $data.length; i++) {
      if ($data[i] === $eventTarget) {
        $data[i].className = 'ship-data';
      } else {
        $data[i].className = 'ship-data hidden';
      }
    }
  }
});
