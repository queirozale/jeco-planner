import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import Nav from '../components/nav';
import Header from '../components/Header';
import Searchbar from '../components/Searchbar';
import CustomChart from '../components/Chart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: 'auto',
      overflow: 'hidden',
      minHeight: '100vh',
      backgroundColor: 'rgb(64, 64, 64, 0.2)',
      backgroundImage: `url(${"trip3.png"})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    results: {
      minWidth: 1000,
      minHeight: 500,
      marginBottom: theme.spacing(5),
    }
  }),
);

const IndexPage: NextPage = () => {
  const classes = useStyles();
  const [city, setCity] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async event => {
    setLoading(true);

    event.preventDefault();

    const res = await fetch('/api/search', {

      body: JSON.stringify({
        city: city,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await res.json();

    if (res.status === 200) {
      setChartData(result[0].daily_average);
    };

    setLoading(false);
  };

  return (
    <div className={classes.paper}>
      <Grid container spacing={5} className={classes.root}>
        <Grid item xs={12} sm={12}>
          <Header />
        </Grid>
        <Grid item xs={12} sm={12} style={{textAlign: "center"}}>
          <Searchbar setCity={setCity} handleSearch={handleSearch} />
        </Grid>
        <Grid item xs={12} sm={12} style={{textAlign: "center"}}>
          <Paper className={classes.results}>
              {city ? 
              <Typography variant="h6">
                {city}
              </Typography>
              :
              <Typography variant="h6">
                Escolha a cidade
              </Typography>
              }
            {loading &&
            <LinearProgress />
            }
            {chartData &&
              <Typography variant="h6">
                <CustomChart data={chartData} />
              </Typography>
            }
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default IndexPage;
