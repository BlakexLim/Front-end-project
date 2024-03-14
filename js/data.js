'use strict';
let data = {
  currentShip: 'current ship',
  saveFleet: [],
  fleet: [],
};
window.addEventListener('beforeunload', () => {
  const storedFleetJson = JSON.stringify(data);
  localStorage.setItem('Javascript-local-storage', storedFleetJson);
});
const previousStoredFleetJson = localStorage.getItem(
  'Javascript-local-storage',
);
if (previousStoredFleetJson !== null) {
  data = JSON.parse(previousStoredFleetJson);
}
