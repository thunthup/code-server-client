import "./App.css";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';
function App() {
  const [status, setstatus] = useState(false);
  const [fetchStatus, setfetchStatus] = useState(false);

  const getStatus = async () => {
    axios
      .get(
        "https://asia-southeast1-planar-truck-302513.cloudfunctions.net/getCodeServerStatus"
      )
      .then(function (response) {
        setstatus(response.data);
        setfetchStatus(true);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getStatus();
  }, []);

  const handleStart = async () => {
    await setfetchStatus(false);
    axios
      .get(
        "https://asia-southeast1-planar-truck-302513.cloudfunctions.net/startCodeServer"
      )
      .then(function (response) {
        console.log("start");
        console.log(response);
        getStatus();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleStop = async () => {
    await setfetchStatus(false);
    axios
      .get(
        "https://asia-southeast1-planar-truck-302513.cloudfunctions.net/stopCodeServer"
      )
      .then(function (response) {
        console.log("stop");
        getStatus();
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <a
            className="text-reset text-decoration-none row fw-bold display-1 justify-content-center my-4"
            href={"https://vs.thunthup.me:8080"}
          >
            CODE SERVER 
          </a>
          <div className="row my-4 " />
          {fetchStatus ? (
            <div className="row m-3 mb-4 text-center">
              Status: {status ? "Instance running" : "Instance stopped"}
            </div>
          ) : (
            <div className="row m-3 mb-4 text-center">
              
              <Box sx={{ display: "flex", margin:0 ,padding:0 }}>
              Status:&nbsp;&nbsp;<CircularProgress />
              </Box>
            </div>
          )}
          
          <div className="row">
            <Button
              className="col mx-4"
              variant="contained"
              startIcon={<PlayCircleFilledIcon />}
              onClick={() => handleStart()}
              disabled={!fetchStatus || status}
              size = "large"
            >
              Start
            </Button>
            <Button
              className="col mx-4"
              variant="contained"
              endIcon={<StopCircleIcon />}
              color="error"
              onClick={() => handleStop()}
              disabled={!fetchStatus || !status}
              size="large"
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
