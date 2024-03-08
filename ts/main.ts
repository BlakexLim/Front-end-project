// interface Starships {
//   model: string;
//   manufacturer: string;
//   class: string;
//   maxAtmSpd: number;
//   hyperDriveRating: number;
//   cost: number;
// }

// let starShips = []
async function getStarShips(): Promise<void> {
  try {
    const response = await fetch('https://www.swapi.tech/api/starships/');
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}
getStarShips();
