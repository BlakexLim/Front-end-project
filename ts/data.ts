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
  localStorage.setItem('Javascript-local-storage', storedFleetJson);
});

const previousStoredFleetJson = localStorage.getItem(
  'Javascript-local-storage',
);

if (previousStoredFleetJson !== null) {
  data = JSON.parse(previousStoredFleetJson);
}
