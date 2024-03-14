/* exported data */
interface Data {
  currentShip: string | null;
}

interface StoredFleet {
  uid: string;
  name: string;
}

const data: Data = {
  currentShip: 'current ship',
};

let storedFleet: StoredFleet[] = [];
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
