'use strict';
async function apiData() {
  const response = await fetch('https://www.swapi.tech/api/starships/2');
  const data = await response.json();
  console.log(data);
}
apiData();
