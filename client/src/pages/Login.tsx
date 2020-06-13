import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { IAppState } from '../reducers';
import { Alert } from '@material-ui/lab';
import { ILoginData, IAuthState } from '../types/auth.types';
import { ThunkDispatch } from '../types/common.types';

interface ILoginProps {
  login?: (loginData: ILoginData) => Promise<void>;
  auth?: IAuthState;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const INITIAL_STATE: ILoginData = {
  login: '',
  password: '',
};

function Login(props: ILoginProps = {}): JSX.Element {
  const { login, auth } = props;

  const classes = useStyles();
  const history = useHistory();

  const [userData, setUserData] = useState<ILoginData>(INITIAL_STATE);

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prevState: ILoginData) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (userData.login && userData.password && login) {
      login(userData);
    }
  };

  useEffect(() => {
    if (auth?.data?.accessToken) {
      history.push('/');
    }
  }, [auth, history]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Username"
            name="login"
            autoComplete="login"
            onChange={handleDataChange}
            value={userData.login}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleDataChange}
            value={userData.password}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {props.auth?.error?.messages.map((m: string) => (
            <Alert severity="error">{m}</Alert>
          ))}
          <Grid container>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state: IAppState): ILoginProps => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch): ILoginProps => ({
  login: (userData: ILoginData) => dispatch(login(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
