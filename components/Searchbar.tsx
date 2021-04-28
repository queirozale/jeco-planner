import React, { useState } from 'react';
import useSWR from 'swr';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

interface SearchbarProps {
  setCity: any;
  handleSearch: any;
}

const Searchbar = (props: SearchbarProps) => {
  const classes = useStyles();
  const setCity = props.setCity;
  const handleSearch = props.handleSearch;

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSearch}>
      <InputBase
        className={classes.input}
        placeholder="Encontre seu destino"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleChange}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Searchbar;