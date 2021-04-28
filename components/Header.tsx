import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(10),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: 'black'
    },
    appBar: {
      background: 'white',
    }
  }),
);

export default function Header() {
  const classes = useStyles();
  const [ session, loading ] = useSession();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Typography variant="h5" className={classes.title}>
              JecoPlanner
            </Typography>
          </IconButton>
          {session &&
            <Typography variant="h6" className={classes.title}>
              {session.user.email}
            </Typography>
          }
          {!session &&
            <Typography variant="h6" className={classes.title}>
            </Typography>
          }
          {!session &&
            <div>
              <Button variant="contained" color="primary" onClick={(): Promise<void> => signIn("auth0")}>Sign in</Button>
            </div>
          }
          {session &&
            <div>
              <Button variant="contained" color="primary" onClick={(): Promise<void> => signOut()}>Sign out</Button>
            </div>
          }

          {loading && (
            <div className="text-5xl">
              <h1>Loading</h1>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
