import React from 'react';
import {
  Card as VendorCard,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';

interface ICardProps {
  title: string;
  body: string;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Card(props: ICardProps): JSX.Element {
  const classes = useStyles();

  return (
    <VendorCard className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.title}
        </Typography>
        <Typography variant="body2" component="p">
          {props.body}
        </Typography>
      </CardContent>
    </VendorCard>
  );
}
