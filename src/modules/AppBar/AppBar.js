import React, { memo } from 'react';
import { useLocalQuery } from './../../utils/apollo/helpers';
import { useMutation } from '@apollo/react-hooks';
import MuiAppBar from '@material-ui/core/AppBar';
import { Menu } from '@material-ui/icons';
import AppBarTitle from './AppBarTitle';
import { makeStyles } from '@material-ui/core/styles';
import { toggle as toggleMainMenu } from './../../mutations/MainMenu';
import getFilterSheet from '../../queries/local/getFilterSheet';
import classNames from 'classnames';
import { SearchFieldContainer } from './../SearchField/SearchFieldContainer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { IconButton, Button, Toolbar } from '@material-ui/core';
import { AttachMoney } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  AppBar: {
    left: 0,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'row',
    background: theme.palette.primary.A700,
    paddingRight: '0 !important',
    // padding: theme.spacing(0, 2),
    justifyContent: 'space-between',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'flex-start'
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  AppBarMenu: {
    display: 'flex',
    justifyContent: 'space-between',

  },
  MenuButton: {
    color: theme.palette.common.white,
    marginRight: theme.spacing(2),
    padding: 0
  },
  CreditButton: {
    color: theme.palette.common.white,
    paddingLeft: theme.spacing(1)
  },
  AddSpotButton: {
    color: theme.palette.common.white,
    marginRight: theme.spacing(2)
  },
  SearchField: {
    flex: 1
  },
  Toolbar: {
    display: 'flex',
    width: '100%'
  },
  flexGrow: {
    flex: 1
  }
}));

function AppBar() {
  const FilterSheet = useLocalQuery(getFilterSheet);
  const [toggleMainMenuHandler] = useMutation(toggleMainMenu, {
    ignoreResults: true
  });
  const isMobile = useMediaQuery('(max-width: 600px)');
  const classes = useStyles();
  return (
    <MuiAppBar
      elevation={0}
      position="fixed"
      classes={{
        root: classNames(classes.AppBar, {
          [classes.shift]: FilterSheet.isOpen
        })
      }}
    >
      <Toolbar classes={{ root: classes.flexGrow }}>
        {isMobile && (
          <IconButton
            size="small"
            className={classes.MenuButton}
            onClick={toggleMainMenuHandler}
          >
            <Menu />
          </IconButton>
        )}

        <AppBarTitle text={'spotsmasher'} />
        <Toolbar classes={{ root: classes.Toolbar }}>
        <SearchFieldContainer />
        </Toolbar>
        {/* <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            console.log('add money');
          }}
          classes={{ root: classes.CreditButton }}
        >
          <AttachMoney />
          {'0,00'}
        </Button> */}
      </Toolbar>
    </MuiAppBar>
  );
}

export default memo(AppBar);
