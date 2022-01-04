import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { CoronaCases } from "./CoronaCases";
import { Vaccinations } from "./Vaccinations";

const useStyles = makeStyles({
  container: {
    margin: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 600,
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  flag: {
    height: 200,
    marginBottom: 20,
  },
  searchContainer: {
    display: "flex",
    marginBottom: 40,
  },
  button: {
    marginLeft: 10,
    height: 50,
    width: 100,
    backgroundColor: "#000",
    color: "white",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});

const COUNTRIES_API = "https://corona-api.com/countries";

export const Dashboard = () => {
  const classes = useStyles();
  const [countries, setCountries] = useState();
  const [countryCode, setCountryCode] = useState();
  const [country, setCountry] = useState();
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${COUNTRIES_API}`);
      if (res.ok) {
        setCountries(await res.json());
      } else {
        console.error("Could not fetch contries");
      }
    };
    fetchData();
  }, []);

  const getCountryCode = (country) => {
    if (country) {
      return country.code;
    } else {
      console.error("Could not find specified country");
    }
  };

  const onSearch = async () => {
    const inputValue = inputRef.current.value;
    if (!inputValue) {
      alert("You must provide a valid country");
      console.error("You must provide a valid country");
      return;
    }

    const formattedInput = `${inputValue
      .charAt(0)
      .toUpperCase()}${inputValue.slice(1)}`;
    const country = countries.data.find(
      (country) => country.name === formattedInput
    );
    if (country) {
      setCountry(formattedInput);
    } else {
      alert("You must provide a valid country");
      console.error("Could not find a country with that name");
      return;
    }
    const countryCode = await getCountryCode(country);
    setCountryCode(countryCode);
  };

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        Search for a country <br /> to display their corona cases and
        vaccination data
      </div>
      <div className={classes.searchContainer}>
        <input ref={inputRef} />
        <Button className={classes.button} onClick={() => onSearch()}>
          Search
        </Button>
      </div>
      {countryCode && (
        <img
          src={`https://flagpedia.net/data/flags/w580/${countryCode.toLowerCase()}.png`}
          className={classes.flag}
        ></img>
      )}
      <Box className={classes.dataContainer}>
        <CoronaCases countryCode={countryCode} />
        <Vaccinations country={country} />
      </Box>
    </div>
  );
};
