import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  SpotNavigationBar: {
    justifyContent: 'space-between',
    position: 'fixed',
    width: '100%',
    background: 'white',
    zIndex: 10
  },
  Wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  Panel: {
    display: 'flex',
    [theme.breakpoints.down('sx')]: {
      justifyContent: 'space-between',
      padding: theme.spacing(1, 2)
    },
    [theme.breakpoints.up('sx')]: {
      justifyContent: 'space-between',
      padding: theme.spacing(2, 3)
    }
  },
  toolbar: theme.mixins.toolbar
}));

const SpotNavigationBar = () => {
  const classes = useStyles();
  return (
    <>
      <section className={classes.SpotNavigationBar}>
        <Box className={classes.Wrapper}>
          {/* <InfoBarText {...InfoBarTextProps} />
          <FilterButton /> */}
        </Box>
        <Divider />
      </section>
      {/* <div className={classes.toolbar} /> */}
    </>
  );
};

SpotNavigationBar.propTypes = {
  InfoBarTextProps: PropTypes.object
};

export default SpotNavigationBar;
