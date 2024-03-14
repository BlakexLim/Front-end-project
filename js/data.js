'use strict';
const data = {
  currentShip: 'current ship',
};
let storedFleet = [];
const previousStoredFleetJson = localStorage.getItem(
  'javascript-local-storage',
);
if (previousStoredFleetJson !== null) {
  storedFleet = JSON.parse(previousStoredFleetJson);
}
window.addEventListener('beforeunload', () => {
  const storedFleetJson = JSON.stringify(data);
  console.log(storedFleet);
  localStorage.setItem('Javascript-local-storage', storedFleetJson);
});
