/* exported data */
interface StoredFleet {
  uid: string;
  name: string;
}

interface Data {
  currentShip: string | null;
  saveFleet: StoredFleet[];
  fleet: any[];
}

let data: Data = {
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
