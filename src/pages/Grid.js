import React, { useCallback, useRef, useState } from "react";
import "../grid.css";
import { ReactComponent as PlayIcon } from "../icons/play-button.svg";
import { ReactComponent as PauseIcon } from "../icons/pause-button.svg";
import { ReactComponent as CleanIcon } from "../icons/vacuum-cleaner.svg";
import { ReactComponent as RandomIcon } from "../icons/rolling-dices.svg";
import { ReactComponent as NextIcon } from "../icons/next-button.svg";
import { ReactComponent as InfoIcon } from "../icons/info.svg";
import produce from "immer";

import GoL from "../simulations/GameOfLife";
import BriansBrain from "../simulations/BriansBrain";
// import Asharp from "../simulations/Asharp";

let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

let numCols = parseInt(winWidth / 20) - 2;
let numRows = parseInt(winHeight / 20) - 2;

const modes = ["GoL", "BriansBrain", "Djikstra", "Astar"];
const modeTitles = ["Game of Life", "Brian's Brain", "Djikstra's", "A*"];

function cycleMode(props) {
  var idx = props;
  console.log(idx);
  if (idx <= modes.length - 2) {
    idx = idx + 1;
  } else {
    idx = 0;
  }
  return idx;
}

function ToolTip(mode) {
  const [infoVisible, setInfoVisible] = useState(false);
  console.log(mode);
  return (
    <>
      <div className="ToolTip">
        <div
          className="icon-button"
          onClick={() => {
            setInfoVisible(!infoVisible);
          }}
        >
          <div className="icon">{<InfoIcon />}</div>
        </div>
      </div>
      {infoVisible && <InfoBox>{mode.children}</InfoBox>}
    </>
  );
}

function InfoBox(mode) {
  return (
    <>
      <div className="InfoBox">
        <div>{modeTitles[mode.children]}</div>
        <div>hello my name is krishna and i want this paragraph to ente</div>
      </div>
    </>
  );
}

function emptyGrid() {
  const rows = [];
  for (let i = 0; i < numRows; ++i) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
}

function Randomize() {
  const rows = [];
  for (let i = 0; i < numRows; ++i) {
    rows.push(Array.from(Array(numCols), () => Math.round(Math.random())));
  }
  return rows;
}
// function placeStartEnd(g, i, j) {
//   const start = [-1, -1];
//   const end = [-1, -1];
//   let point = -1;
//   if (pointsPlaced == 0) {
//     point = -1;
//   }
//   const newGrid = produce(g, (gridCopy) => {
//     gridCopy[i][j] = g[i][j] == 0 ? 3 : 1;
//   });
//   return newGrid;
// }

function Djikstra() {}

function Asharp() {}

//Grid functionality
function Grid() {
  const [grid, setGrid] = useState(() => {
    return emptyGrid();
  });

  const [running, setRun] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const [mode, setMode] = useState(0);

  const [startPoint, setStartPoint] = useState(false);

  const simulate = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      if (mode == 0) {
        return GoL(g, numRows, numCols);
      } else if (mode == 1) {
        return BriansBrain(g, numRows, numCols);
      }
    });
    setTimeout(simulate, 100);
  });

  console.log(grid);
  console.log("mode == " + mode);

  return (
    <>
      <ToolTip>{mode}</ToolTip>

      <h1 className="mode-title">{modeTitles[mode]}</h1>

      <div className="GridBar">
        {/* pause-play button */}
        <div
          onClick={() => {
            setRun(!running);
            if (!running) {
              runningRef.current = true;
              simulate();
            }
          }}
          className="icon-button"
        >
          <div className="icon">{running ? <PauseIcon /> : <PlayIcon />}</div>
        </div>

        {/* clean button */}
        <div
          onClick={() => {
            setGrid(emptyGrid());
            if (running) {
              setRun(!running);
            }
          }}
          className="icon-button"
        >
          <div className="icon">{<CleanIcon />}</div>
        </div>

        {/* random button */}
        <div
          onClick={() => {
            setGrid(Randomize());
            if (running) {
              setRun(!running);
            }
          }}
          className="icon-button"
        >
          <div className="icon">{<RandomIcon />}</div>
        </div>

        {/* cycle button */}
        <div
          onClick={() => {
            setMode(cycleMode(mode));
            if (running) {
              setRun(!running);
            }
          }}
          className="icon-button"
        >
          <div className="icon">{<NextIcon />}</div>
        </div>
      </div>

      <div className="grid-move">
        <div className="grid-flex">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${numCols}, 22px)`,
            }}
          >
            {grid.map((rows, i) =>
              rows.map((col, j) => (
                <div
                  key={`${i}-{j}`}
                  onClick={() => {
                    const newGrid = produce(grid, (gridCopy) => {
                      if (grid[i][j] == 3) {
                        setStartPoint(false);
                      }
                      gridCopy[i][j] = grid[i][j] != 0 ? 0 : 1;
                    });
                    setGrid(newGrid);
                  }}
                  //handle start end placement here
                  onContextMenu={() => {
                    console.log(startPoint);
                    console.log(mode);
                    console.log(running);
                    if (mode == 3 && !running && !startPoint) {
                      const newGrid = produce(grid, (gridCopy) => {
                        gridCopy[i][j] = grid[i][j] != 0 ? 0 : 3;
                      });
                      setGrid(newGrid);
                      setStartPoint(true);
                    }
                  }}
                  className={
                    grid[i][j] == 0
                      ? "dead"
                      : grid[i][j] == 1
                      ? modes[mode]
                      : grid[i][j] == 2
                      ? "BriansBrain2"
                      : grid[i][j] == 3
                      ? "StartPointAsharp"
                      : undefined
                  }
                ></div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Grid;
