import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Button, Toolbar } from '@material-ui/core';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import AddIcon from '@material-ui/icons/AddLocation';
import { AttachMoney, AddLocation } from '@material-ui/icons';
// import navigateAddSpot from './../../routes/handlers/navigateAddSpot';
// import navigateProfile from './../../routes/handlers/navigateProfile';
// import { update as updateSearchField } from './../../mutations/SearchField';
// import withUseRouteHandler from '../../utils/router/withUseRouteHandler';
// import { compose } from 'recompose';
// import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles(theme => ({
  AppBarMenu: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  MenuButton: {
    color: theme.palette.common.white
    // padding: theme.spacing(1),
    // margin: theme.spacing(1),
  },
  hidden: {
    display: 'none !important'
  },
  CreditButton: {
    // root: {
    color: theme.palette.common.white,
    // padding: theme.spacing(1, 2)
    paddingLeft: theme.spacing(1)
    // }
  },
  AddSpotButton: {
    color: theme.palette.common.white
  }
}));

function AppBarMenu() {
  const classes = useStyles();
  // const [showSearchField] = useMutation(updateSearchField, {
  //   variables: { isVisible: true },
  //   ignoreResults: true
  // });
  // const navigateAddSpotHandler = useRouteHandler(navigateAddSpot);
  // const navigateProfileHandler = useRouteHandler(navigateProfile);
  return (
    <div className={classes.AppBarMenu}>
     
    </div>
  );
}

AppBarMenu.propTypes = {
  useRouteHandler: PropTypes.func
};

export default AppBarMenu;
