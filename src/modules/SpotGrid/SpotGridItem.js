import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Toolbar, IconButton } from '@material-ui/core';
import { Share, Navigation, Favorite } from '@material-ui/icons';
// import CenteredButton from './../../components/CenteredButton';
// import UnlockIcon from '@material-ui/icons/LockOpen';
// import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  SpotGridItem: {
    listStyleType: 'none',
    position: 'relative',
    transition: 'background ease-in-out 1s',
    "&:hover $background": {
      border: '1px solid #aaa'
    }
  },
  SpotActionToolbar: {
    display: 'flex',
    alignContent: 'flex-end'
  },
  SpotActionIcon: {
    marginRight: theme.spacing(1)
    // color: theme.palette.common.white
  },
  background: {
    width: '100%',
    height: '15em',
    borderRadius: '0.25em',
    display: 'block',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    border: '1px solid white'
  },
  locked: {
    filter: 'grayscale(100%) contrast(90%) brightness(150%)'
  },
  unlocked: {
    cursor: 'pointer',
    filter: 'grayscale(75%) contrast(150%) brightness(100%) opacity(0.95)'
  },
  title: {
    textAlign: 'left',
    'white-space': 'nowrap',
    'text-overflow': 'ellipsis',
    overflow: 'hidden'
  },
  distance: {
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold',
    'white-space': 'nowrap'
  },
  titleBar: {
    width: '100%',
    display: 'flex',
    padding: theme.spacing(0, 0, 1.25),
    fontSize: '1.25em',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));

const SpotGridItem = ({
  spot,
  navigateSpotHandler
  // addSpotToSelectionHandler
}) => {
  const classes = useStyles();
  const urlPrefix = process.env.NODE_ENV === 'production' ? 'https://assets.spotsmasher.com' : '';
  return (
    <li className={classes.SpotGridItem}>
      <div className={classes.titleBar}>
        <span className={classes.title}>{spot.title}</span>
        <span className={classes.distance}>
          {(Math.round(spot.distance) / 1000).toFixed(1) + ' km'}
        </span>
      </div>
      {spot.media && spot.media.length > 0 ? (
        <div
          onClick={navigateSpotHandler}
          className={classnames(classes.background, classes.unlocked)}
          style={{ backgroundImage: `url('${urlPrefix}/${spot.media[0].url}')` }}
        />
      ) : null}
      {/* <Toolbar
        variant="dense"
        disableGutters
        classes={{ root: classes.SpotActionToolbar }}
      >
        <IconButton
          size="small"
          className={classes.SpotActionIcon}
          onClick={() => {
            console.log('Favorite', spot);
          }}
        >
          <Favorite />
        </IconButton>
        <IconButton
          size="small"
          className={classes.SpotActionIcon}
          onClick={() => {
            console.log('Share', spot);
          }}
        >
          <Share />
        </IconButton>
        <IconButton
          size="small"
          className={classes.SpotActionIcon}
          onClick={() => {
            console.log('Navigate', spot);
          }}
        >
          <Navigation />
        </IconButton>
      </Toolbar> */}
      {/* <CenteredButton
        color="primary"
        onClick={addSpotToSelectionHandler}
        text="Smash"
        icon={AddIcon}
      /> */}
    </li>
  );
};

SpotGridItem.propTypes = {
  spot: PropTypes.object,
  navigateSpotHandler: PropTypes.func,
  addSpotToSelectionHandler: PropTypes.func
};

export default memo(SpotGridItem);
