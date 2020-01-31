import React, { useEffect, useState } from "react";
import APP_K from "./config";
import "./App.scss";
import { Button, Container, FormGroup, Label, Input } from "reactstrap";
import Result from "./components/Result";
import Data from "./components/Data";
import FormateDate from "./components/FormateDate";

export default () => {
  const [data, setData] = useState({});
  const [flightNum, setFlight] = useState("078");
  // const [date, setdate] = useState(new Date());
  const [airline, setAirline] = useState("QR");

  const APP_KEY = APP_K;
  const flightData = async () => {
    let i = Math.random();
    let x = { flightStatuses: Math.random() };
    setData(x);
    console.log(data);
    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/${airline}/${flightNum}/dep/2020/1/31?appId=${appId}&appKey=${APP_KEY}`
      );

      // throw an error if response doesn't exist
      if (response.status !== 200) {
        throw new Error("Falied to fetch, please try again");
      }
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      setData(jsonResponse);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    flightData();
  };

  const flightChange = e => {
    setFlight(e.target.value);
    flightData();
  };

  const airlineChange = e => {
    setAirline(e.target.value);
    flightData();
  };
  useEffect(() => {
    flightData();
  }, []);
  useEffect(() => {}, [data]);

  return (
    <div className="App">
      <h1 className="textheader">Flight Tracking</h1>
      <Container className="themed-container">
        <FormGroup onSubmit={handleSubmit}>
          <div>
            <Label for="exampleSearch">Flight Number: </Label>
            <Input
              type="text"
              name="search"
              id="exampleSearch"
              value={flightNum}
              placeholder="type a flight number"
              onChange={flightChange}
            />
          </div>
          <div>
            <Label for="exampleSearch">AirLines: </Label>
            <Input
              type="text"
              className="input"
              name="search"
              value={airline}
              id="exampleSearch"
              placeholder=""
              onChange={airlineChange}
            />
          </div>
        </FormGroup>
        <div>
          <Button className="btn" onClick={flightData} color="primary">
            Search
          </Button>
        </div>
      </Container>
      {/* add hasownpoperty to check if object contains a specifid object */}
      {data.hasOwnProperty("flightStatuses") && (
        <div>
          {data.flightStatuses.length && (
            <div className="second-container">
              <h1>Result : </h1>
          <h3>Flight Number: {data.flightStatuses[0].flightNumber}</h3>
              <h3>
                From : {data.flightStatuses[0].departureAirportFsCode} To :{" "}
                {data.flightStatuses[0].arrivalAirportFsCode}
              </h3>
              <h3>Flight Status: <Result status={data.flightStatuses[0].status} /></h3>
              <h3>
                {" "}
                Arrival Time: {data.flightStatuses[0].arrivalDate.dateLocal}
              </h3>
              <h3>
                Date : <FormateDate date={data.request.date.interpreted} />
              </h3>
              <h3>
                Flight Duration is :
                <Data
                  minutes={
                    data.flightStatuses[0].flightDurations.airMinutes
                      ? data.flightStatuses[0].flightDurations.airMinutes
                      : data.flightStatuses[0].flightDurations
                          .scheduledBlockMinutes
                  }
                />{" "}
                hours
              </h3>
                <h3> Departure Gate: {data.flightStatuses[0].airportResources.departureGate}</h3>
                <h3> Arrival Gate: {data.flightStatuses[0].airportResources.arrivalTerminal}</h3>
                {/* <h3> Baggages Belt: {data.flightStatuses[0].airportResources.baggage}</h3> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const appId = "19e14d57";