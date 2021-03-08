import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiBottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Favorite, Search, AccountCircle, NearMe } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    [theme.breakpoints.down('sx')]: {
      display: 'flex'
    },
    [theme.breakpoints.up('sx')]: {
      display: 'none'
    }
  }
}));

export const BottomNavigation = () => {
  const classes = useStyles();
  const history = useHistory();
  const userId = 1234;
  function handleChange(event, url) {
    history.push(url)
    
  }

  return (null
    // <MuiBottomNavigation
    //   value=""
    //   onChange={handleChange}
    //   className={classes.root}
    // >
    //   <BottomNavigationAction
    //     value=""
    //     label="search"
    //     icon={<Search/>}
    //   />
    //   <BottomNavigationAction
    //     value="bucket"
    //     label="bucket"
    //     icon={<Favorite/>}
    //   />
    //   <BottomNavigationAction
    //     value="session"
    //     label="session"
    //     disabled
    //     icon={<NearMe/>}
    //   />
    //   <BottomNavigationAction
    //     value={`/user/${userId}`}
    //     label="profile"
    //     disabled
    //     icon={<AccountCircle/>}
    //   />
    // </MuiBottomNavigation>
  );
};
