import React, { memo } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));

const About = memo(() => {
  const classes = useStyles();
  return (
    <Paper classes={classes}>
      <Typography variant="h1">About.</Typography>
      <Typography gutterBottom>
        Spotlocator is an online platform for skateboarders to share and find
        skate spots around the world. Please note that this a prototype that
        does not support all features. Adding spots to the platform will be
        supported on Android and ios platforms in the near future.
      </Typography>
      <Typography>All rights reserved. Donny Verduijn.</Typography>
    </Paper>
  );
});

export default About;
