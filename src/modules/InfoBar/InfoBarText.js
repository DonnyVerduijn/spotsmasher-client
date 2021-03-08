import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const InfoBarText = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography variant="h5" classes={{ root: classes.InfoBarText }}>
      {children}
    </Typography>
  );
}

InfoBarText.propTypes = {
  children: PropTypes.any
};

const useStyles = makeStyles(theme => ({
  InfoBarText: {

      // padding: theme.spacing(2, 3),
    
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

export default memo(InfoBarText)