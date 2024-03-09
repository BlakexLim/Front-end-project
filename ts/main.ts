interface StarShipName {
  name: string;
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
  })
  .catch((error) => {
    console.error('Error', error);
  });

function getShipName(starship: StarShipName): void {
  const $shipName = document.createElement('li');
  $shipName.setAttribute('class', 'ship-name');
  $shipName.textContent = starship.name;
  $ul?.appendChild($shipName);
  console.log($shipName);
}
