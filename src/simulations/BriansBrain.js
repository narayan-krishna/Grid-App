import produce from "immer";

const neighborPairs = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function countNeighbors(g, i, j) {
  let neighbors = 0;
  for (let k = 0; k < neighborPairs.length; ++k) {
    if (g[i + neighborPairs[k][0]][j + neighborPairs[k][1]] == 1) {
      neighbors++;
    }
  }
  return neighbors;
}

function BriansBrain(g, numRows, numCols) {
  return produce(g, (gridCopy) => {
    for (let i = 1; i < numRows - 1; i++) {
      for (let j = 1; j < numCols - 1; j++) {
        let neighbors = countNeighbors(g, i, j);
        if (g[i][j] == 2) {
          gridCopy[i][j] = 0;
        } else if (g[i][j] == 1) {
          gridCopy[i][j] = 2;
        } else if (neighbors == 2) {
          gridCopy[i][j] = 1;
        } else {
          gridCopy[i][j] = g[i][j];
        }
      }
    }
  });
}

export default BriansBrain;
