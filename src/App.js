import React, { useCallback, useRef, useState } from "react";
import Grid from "./pages/Grid";

function App() {
  //a single block with a dead or alive status function Cell() { const [status, setStatus] = useState(false); console.log(status); return (
  return (
    <div className="">
      <Grid></Grid>
    </div>
  );
}

export default App;

//can be 1 starting point 1 end point
//should create an info tool tip on hovering mode name
