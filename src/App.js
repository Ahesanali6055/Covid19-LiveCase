import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import Info from './Components/Info';
import Map from './Components/Map';
import Graph from './Components/Graph';
import numeral from 'numeral';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [casesType, setCashType] = useState("cases");
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const res = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v2.1/events")
      const { events } = await res.json()
      console.log(events);
      setEventData(events)
      setLoading(false)
    }

    fetchEvents()
    console.log(eventData);
  }, []);



  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      });
  }, []);

  useEffect(() => {
    const featchApi = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    featchApi();
  }, []);


  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        // setInputCountry(countryCode);
        setCountryInfo(data);
        // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        // setMapZoom(4);
      });
  };
  console.log(countryInfo)


  return (
    <div className="app">
      <div className="covid19">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">worldwild</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        
          <div className="box3">
            <Info className="box01"
              title="Corona Case"
              cases={countryInfo.todayCases}
              total={countryInfo.cases} />

            <Info className="box01"
              title="Recover case"
              cases={countryInfo.todayRecovered}
              total={countryInfo.recovered} />

            <Info className="box01"
              title="Deaths case"
              cases={countryInfo.todayDeaths}
              total={countryInfo.deaths} />
          </div>
     

        <div>
          {<Map eventData={eventData} />}
        </div>

        {/* <Map /> */}

        <div>
          <Graph casesType={casesType} />
        </div>

      </div>

    </div>
  )
}
export default App
