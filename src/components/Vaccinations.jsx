import { Card } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
  },
  container: {
    minHeight: 200,
    margin: 20,
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  card: {
    backgroundColor: "#8080808c",
  },
  title: {},
  subTitle: {
    fontWeight: 600,
  },
  divider: {
    margin: "20px 0 20px",
  },
});

const VACCINE_API = "https://covid-api.mmediagroup.fr/v1/vaccines";

export const Vaccinations = ({ country }) => {
  const classes = useStyles();
  const [vaccinations, setVaccinations] = useState();

  useEffect(() => {
    if (!country) {
      return;
    }
    fetchVaccinations();
  }, [country]);

  const fetchVaccinations = async () => {
    const res = await fetch(`${VACCINE_API}?country=${country}`);
    if (res.ok) {
      const data = await res.json();
      setVaccinations(data.All);
    } else {
      console.error("Something went wrong fetching vaccinations data");
    }
  };

  const getPercentage = (part, total) => {
    return ((part / total) * 100).toFixed(2);
  };

  return (
    <div className={classes.root}>
      {vaccinations && (
        <Card className={classes.card} variant="outlined">
          <div className={classes.container}>
            <h1 className={classes.title}>Vaccinations</h1>
            <div className={classes.divider} />
            <div>
              <span className={classes.subTitle}>Population</span>
              {`: ${vaccinations.population}`}
            </div>
            <div>
              <span className={classes.subTitle}>Partially vaccinated</span>
              {`: ${vaccinations.people_partially_vaccinated} (${getPercentage(
                vaccinations.people_partially_vaccinated,
                vaccinations.population
              )}%)`}
            </div>
            <div>
              <span className={classes.subTitle}>Fully vaccinated</span>
              {`: ${vaccinations.people_vaccinated} (${getPercentage(
                vaccinations.people_vaccinated,
                vaccinations.population
              )}%)`}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
