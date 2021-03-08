import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '../utils/apollo/helpers';
import getSpot from '../queries/getSpot';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import InfoBar from '../modules/InfoBar/InfoBar';
import Box from '@material-ui/core/Box';
import SpotMap from '../modules/SpotMap/SpotMap';
import InfoBarText from '../modules/InfoBar/InfoBarText';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative'
  },
  img: {
    height: '100%',
    backgroundColor: 'grey',
    backgroundSize: 'cover',
    // width: '100%',
    // maxWidth: '600px',
    flex: 1,
    minWidth: '30vh',
    maxWidth: '40em'
  },
  unlocked: {
    cursor: 'pointer',
    filter: 'grayscale(75%) contrast(150%) brightness(100%) opacity(0.95)'
  },
  mediaContainer: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    height: '20em',
    backgroundColor: theme.palette.grey[100]
  },
  imageWrapper: {

  }
}));

const Spot = () => {
  const { root, img, unlocked, mediaContainer, imageWrapper } = useStyles();
  const { id } = useParams();
  const spot = useQuery(getSpot, { variables: { id } });

  return (
    <Paper classes={{ root }}>
      <InfoBar>
        <InfoBarText>{spot ? spot.title : ''}</InfoBarText>
      </InfoBar>
      {spot ? (
        <>
          <div className={mediaContainer}>
            <div className={imageWrapper}></div>
            {spot.media.map((media, index) => (
              <div
                key={index}
                className={classNames(img, unlocked)}
                style={{ backgroundImage: `url('https://assets.spotsmasher.com/${media.url}')`}}
              />
            ))}
          </div>
          <Box m={3}>
            <Typography variant="h6" gutterBottom>Description</Typography>
            <Typography>{spot.description}</Typography>
          </Box>
          <SpotMap spot={spot} />
        </>
      ) : null}
    </Paper>
  );
};

export default memo(Spot);

Spot.propTypes = {
  id: PropTypes.string
};
