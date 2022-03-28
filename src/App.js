import "./App.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import axios from "axios";
function App() {
  const [status, setstatus] = useState(false);
  const [fetchStatus, setfetchStatus] = useState(false)
  axios.get('https://asia-southeast1-planar-truck-302513.cloudfunctions.net/getCodeServerStatus')
  .then(function (response) {
    setstatus(response.data)
    setfetchStatus(true)
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  const handleStart = async () => {
    axios.get('https://asia-southeast1-planar-truck-302513.cloudfunctions.net/startCodeServer')
  .then(function (response) {
    console.log("start")
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }

  const handleStop = async () => {
    axios.get('https://asia-southeast1-planar-truck-302513.cloudfunctions.net/stopCodeServer')
  .then(function (response) {
    console.log("stop")
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">

          {fetchStatus ? <div className="row m-3 mb-4 text-center">Status: {status ? "Instance running" : "Instance stopped"}</div> : 
          <div className="row m-3 mb-4 text-center">getting status .....</div>}

          <div className="row">
            <Button
              className="col mx-4"
              variant="contained"
              startIcon={<PlayCircleFilledIcon/>} 
              onClick = {() => handleStart()}
            >
              Start
            </Button>
            <Button
              className="col mx-4"
              variant="contained"
              endIcon={<StopCircleIcon />}
              color="error"
              onClick = {() => handleStop() }
            >
              Stop
            </Button>
          </div>
          <div className="row"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
