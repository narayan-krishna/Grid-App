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

const startPoint = [-1, -1];
const endPoint = [-1, -1];

function getPoints(g) {
  for (let i = 0; i < numRows; ++i) {
    for (let j = 0; j < numRows; ++j) {
      if (g[i][j] == 3) {
        startPoint[0] = i;
        startPoint[1] = j;
      } else if (g[i][j] == 5) {
        endPoint[0] = i;
        endPoint[1] = j;
      }
    }
  }
}

//initialize open list
//initialize closed list

//while the open list is not empty,
// a. find the node with the least f on the open list, call it "q"

function Asharp(g, numRows, numCols) {}

function heuristic(n) {
  var dx = abs(.x - endPoint.x);
  dy = abs(node.x - endPoint.y);
}
