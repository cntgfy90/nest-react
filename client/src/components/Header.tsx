import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

interface IHeaderProps {
  handleLogout: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(0),
    },
    title: {
      flexGrow: 1,
      color: '#fff',
      textDecoration: 'none',
    },
  })
);

export default function Header(props: IHeaderProps): JSX.Element {
  const { handleLogout } = props;

  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link className={classes.title} to="/">
          <Typography variant="h6">Home</Typography>
        </Link>
        <Link className={classes.title} to="/about">
          <Typography variant="h6">About</Typography>
        </Link>
        <Link className={classes.title} to="/contacts">
          <Typography variant="h6">Contacts</Typography>
        </Link>
        <Link className={classes.title} to="/posts">
          <Typography variant="h6">Posts</Typography>
        </Link>
        <Button
          color="inherit"
          onClick={() => {
            handleLogout();
            history.push('/login');
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
