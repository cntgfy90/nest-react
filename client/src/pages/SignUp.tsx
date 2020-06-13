import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from '@material-ui/lab';
import { register } from '../actions/auth';
import { IAppState } from '../reducers';
import { useHistory, Link } from 'react-router-dom';
import {
  IRegisterData,
  IAuthState,
  ISignUpResponse,
} from '../types/auth.types';
import { ThunkDispatch } from '../types/common.types';

interface ISignUpProps {
  register?: (registerData: IRegisterData) => Promise<ISignUpResponse>;
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const INITIAL_STATE: IRegisterData = {
  login: '',
  password: '',
};

function SignUp(props: ISignUpProps = {}): JSX.Element {
  const { register } = props;

  const classes = useStyles();
  const history = useHistory();

  const [userData, setUserData] = useState<IRegisterData>(INITIAL_STATE);
  const [canRediectToLogin, setCanRedirectToLogin] = useState<boolean>(false);

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prevState: IRegisterData) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (userData.login && userData.password && register) {
        const result: ISignUpResponse = await register(userData);

        if (result?.success) {
          setCanRedirectToLogin(true);
        }
      }
    },
    [userData, register]
  );

  useEffect(() => {
    if (canRediectToLogin) {
      history.push('/login');
    }
  }, [canRediectToLogin, history]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="login"
                label="Username"
                name="login"
                autoComplete="login"
                value={userData.login}
                onChange={handleDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userData.password}
                onChange={handleDataChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {props.auth?.error?.messages?.map((m: string) => (
            <Alert severity="error">{m}</Alert>
          ))}
          <Grid container>
            <Grid item>
              <Link to="/login">{'Already have an account? Sign In'}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state: IAppState): ISignUpProps => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch): ISignUpProps => ({
  register: (registerData: IRegisterData) => dispatch(register(registerData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
