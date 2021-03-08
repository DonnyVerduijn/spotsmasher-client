import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { useLocalQuery } from './../../utils/apollo/helpers';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { toggle as toggleMainMenu } from './../../mutations/MainMenu';
import getMainMenu from '../../queries/local/getMainMenu';
import {
  Favorite,
  Search,
  AccountCircle,
  NearMe,
  Settings,
  Info,
  ChevronLeft
} from '@material-ui/icons';

import {
  Divider,
  Drawer,
  IconButton,
  MenuList,
  ListItemIcon,
  MenuItem as MUIMenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';

const useDrawerStyles = makeStyles(theme => ({
  root: {},
  paper: {
    top: 'auto',
    bottom: 0,
    zIndex: 5,
    [theme.breakpoints.down('xs')]: {
      width: '20em'
    },
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - ${theme.spacing(8)}px)`
    },
    [theme.breakpoints.up('xl')]: {
      width: theme.mainMenu.width
    },
    width: theme.mainMenu.width
  }
}));

const useStyles = makeStyles(theme => ({
  list: {
    padding: theme.spacing(2, 0)
  },
  copyright: {
    position: 'absolute',
    bottom: theme.spacing(0),
    padding: theme.spacing(2),
    fontSize: '0.8em',
    color: theme.palette.grey[500]
  }
}));

const useListItemTextStyles = makeStyles(theme => ({
  root: {
    fontWeight: '700'
  }
}));

const MenuItem = memo(
  ({ icon: Icon, onClick, label, url, disabled = false }) => {
    const listItemTextStyle = useListItemTextStyles();
    return (
      <MUIMenuItem
        disabled={disabled}
        classes={listItemTextStyle}
        // leftIcon={Icon}
        primary={label}
        onClick={() => onClick(url)}
      >
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <Typography variant="inherit">{label}</Typography>
      </MUIMenuItem>
    );
  }
);

const useDrawerHeaderStyles = makeStyles(theme => ({
  root: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    ...theme.mixins.toolbar
  }
}));

const IconButtonStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  }
}));

const useToolbarStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}));

const DrawerHeader = ({ onClose }) => {
  const classes = useDrawerHeaderStyles();
  return (
    <Toolbar variant="dense" disableGutters classes={classes}>
      <IconButton
        size="small"
        onClick={onClose}
        classes={IconButtonStyles()}
        color="inherit"
      >
        <ChevronLeft />
      </IconButton>
    </Toolbar>
  );
};

const MenuItems = [
  { label: 'search', disabled: false, icon: Search, url: '/' },
  // { label: 'bucket', disabled: false, icon: Favorite, url: '/bucket' },
  // { label: 'session', disabled: true, icon: NearMe, url: 'session' },
  { label: 'profile', disabled: true, icon: AccountCircle, url: `/profile` }
];

const SecondaryMenuItems = [
  { label: 'settings', disabled: true, icon: Settings, url: '/settings' },
  { label: 'about', disabled: false, icon: Info, url: '/about' }
];

const MainMenu = withWidth()(({ width }) => {
  const classes = useStyles();
  const { toolbar } = useToolbarStyles();
  const drawerStyles = useDrawerStyles();
  const history = useHistory();
  const [toggle] = useMutation(toggleMainMenu, { ignoreResults: true });
  const MainMenu = useLocalQuery(getMainMenu);
  const isMobile = width === 'xs';

  const MenuListMemo = memo(MenuList);
  const onMenuItemClick = url => {
    history.push(url);
    if (isMobile) toggle();
  };

  return (
    <>
      {!isMobile && <div className={toolbar} />}
      <Drawer
        elevation={10}
        transitionDuration={0}
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={MainMenu.isOpen}
        onClose={toggle}
        classes={drawerStyles}
      >
        {isMobile && <DrawerHeader onClose={toggle} />}
        {isMobile && <Divider />}

        <MenuListMemo classes={{ root: classes.list }}>
          {MenuItems.map((props, index) => (
            <MenuItem key={index} onClick={onMenuItemClick} {...props} />
          ))}
        </MenuListMemo>
        <Divider />
        <MenuListMemo>
          {SecondaryMenuItems.map((props, index) => (
            <MenuItem key={index} onClick={history.push} {...props} />
          ))}
        </MenuListMemo>
        <Typography classes={{ root: classes.copyright }}>
          {`Copyright © ${(date => date.getFullYear())(
            new Date()
          )} Spotsmasher`}
        </Typography>
      </Drawer>
    </>
  );
});

export default memo(MainMenu);
