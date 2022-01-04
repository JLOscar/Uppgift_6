import { Card } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

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
const CASES_API = "https://corona-api.com";

export const CoronaCases = ({ countryCode }) => {
  const classes = useStyles();
  const [cases, setCases] = useState();
  useEffect(() => {
    if (!countryCode) {
      return;
    }
    fetchCases();
  }, [countryCode]);

  const fetchCases = async () => {
    const res = await fetch(`${CASES_API}/countries/${countryCode}`);
    if (res.ok) {
      const data = await res.json();
      setCases(data.data);
    } else {
      console.error("Something went wrong fetching corona cases data");
    }
  };

  const getPercentage = (part, total) => {
    return ((part / total) * 100).toFixed(2);
  };

  return (
    <div className={classes.root}>
      {cases && (
        <Card className={classes.card} variant="outlined">
          <div className={classes.container}>
            <h1 className={classes.title}>Corona cases</h1>
            <div className={classes.divider} />
            <div>
              <span className={classes.subTitle}>Confirmed</span>
              {`: ${cases.latest_data.confirmed}`}
            </div>
            <div>
              <span className={classes.subTitle}>Critical</span>
              {`: ${cases.latest_data.critical}`}
            </div>
            <div>
              <span className={classes.subTitle}>Deaths</span>
              {`: ${cases.latest_data.deaths} (${getPercentage(
                cases.latest_data.deaths,
                cases.latest_data.confirmed
              )}%)`}
            </div>
            <div>
              <span className={classes.subTitle}>Recovered</span>
              {`: ${cases.latest_data.recovered} (${getPercentage(
                cases.latest_data.recovered,
                cases.latest_data.confirmed
              )}%)`}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
