'use strict';
let data = {
  currentShip: 'current ship',
  saveFleet: [],
  fleet: [],
};
window.addEventListener('beforeunload', () => {
  const storedFleetJson = JSON.stringify(data);
  localStorage.setItem('StarWars-FleetSim', storedFleetJson);
});
const previousStoredFleetJson = localStorage.getItem('StarWars-FleetSim');
if (previousStoredFleetJson !== null) {
  data = JSON.parse(previousStoredFleetJson);
}
