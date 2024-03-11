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
const $rundown = document.querySelector('.rundown');
if (!$rundown) throw new Error('$rundown query failed');

// $starShip.addEventListener('click', (event: Event) => {
//   const $eventTarget = event.target as HTMLLIElement;
//   if ($eventTarget.tagName === 'LI') {
//    console.log($eventTarget.tagName);
//   }

const apiUrl = 'https://www.swapi.tech/api/starships/';

// async function getStarShip() {
//   try {
//     const response = await fetch(apiUrl);
//     console.log(response);
//     if (!response.ok) {
//       throw new Error(`${response.status} failed to fetch data`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data');
//     throw error
//   }
// }
// getStarShip();

// fetch api data for starship
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    data.results.forEach((starship: StarShipName) => {
      getShipName(starship);
    });
    data.results.forEach((starshipData: StarShipData) => {
      $rundown.append(getShipData(starshipData));
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
}

function getShipData(starshipData: StarShipData): HTMLUListElement {
  const $shipContainer = document.createElement('ul');

  const $shipList = document.createElement('li');
  $shipList.setAttribute('class', 'ship-data');

  const $shipModel = document.createElement('p');
  $shipModel.textContent = starshipData.model;

  const $shipManufacturer = document.createElement('p');
  $shipManufacturer.textContent = starshipData.manufacturer;

  const $shipClass = document.createElement('p');
  $shipClass.textContent = starshipData.class;

  const $shipMaxSpd = document.createElement('p');
  $shipMaxSpd.textContent = String(starshipData.maxAtmSpd);

  const $shipHypDrive = document.createElement('p');
  $shipHypDrive.textContent = String(starshipData.hyperDriveRating);

  const $shipCost = document.createElement('p');
  $shipCost.textContent = String(starshipData.cost);

  const $fleetBtn = document.createElement('button');
  $fleetBtn.setAttribute('class', 'add-to-fleet');
  $fleetBtn.textContent = 'Add to fleet';

  $shipContainer.appendChild($shipList);
  $shipList.appendChild($shipModel);
  $shipList.append($shipManufacturer);
  $shipList.append($shipClass);
  $shipList.append($shipMaxSpd);
  $shipList.append($shipHypDrive);
  $shipList.append($shipCost);
  $shipList.append($fleetBtn);
  return $shipContainer;
}
