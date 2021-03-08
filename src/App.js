import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { CssBaseline } from '@material-ui/core';
import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';
import { BottomNavigation } from './modules/BottomNavigation/BottomNavigation';
import AppBar from './modules/AppBar/AppBar';
import MainMenu from './modules/MainMenu/MainMenu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from './components/CircularProgress';
import classNames from 'classnames';
import { useQuery } from './utils/apollo/helpers';
import getFilterSheet from './queries/local/getFilterSheet';
import getMainMenu from './queries/local/getMainMenu';
import {
  show as showFilterSheet,
  hide as hideFilterSheet
} from './mutations/FilterSheet';
import {
  show as showMainMenu,
  hide as hideMainMenu
} from './mutations/MainMenu';
import { useMutation } from '@apollo/react-hooks';

const Search = lazy(() => import('./routes/Search'));
const Spot = lazy(() => import('./routes/Spot'));
const Bucket = lazy(() => import('./routes/Bucket'));
const Session = lazy(() => import('./routes/Session'));
const Profile = lazy(() => import('./routes/Profile'));
const Settings = lazy(() => import('./routes/Settings'));
const About = lazy(() => import('./routes/About'));
const NotFound = lazy(() => import('./routes/NotFound'));

const useStyles = makeStyles(theme => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8)
    }
  },
  toolbar: theme.mixins.toolbar,

  shiftLeft: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.mainMenu.width,
      width: `calc(100% - ${theme.mainMenu.width}px)`
    }
  },
  shiftRight: {
    [theme.breakpoints.between('sm', 'xl')]: {
      width: `calc(100% - ${theme.filterSheet.small}px)`
    },
    [theme.breakpoints.up('xl')]: {
      width: `calc(100% - ${theme.filterSheet.big}px)`
    }
  },
  shiftBoth: {
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: theme.mainMenu.width
    },
    [theme.breakpoints.between('md', 'xl')]: {
      marginLeft: theme.mainMenu.width,
      marginRight: theme.filterSheet.small,
      width: `calc(100% - ${theme.filterSheet.small + theme.mainMenu.width}px)`
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: theme.mainMenu.width,
      marginRight: theme.filterSheet.big,
      width: `calc(100% - ${theme.filterSheet.big + theme.mainMenu.width}px)`
    }
  }
}));

const App = withWidth()(({ width }) => {
  const filterSheet = useQuery(getFilterSheet);
  const menu = useQuery(getMainMenu);
  const classes = useStyles();
  const [showFilter] = useMutation(showFilterSheet, { ignoreResults: true });
  const [hideFilter] = useMutation(hideFilterSheet, { ignoreResults: true });
  const [showMenu] = useMutation(showMainMenu, { ignoreResults: true });
  const [hideMenu] = useMutation(hideMainMenu, { ignoreResults: true });

  const prevWidthRef = useRef();
  useEffect(() => {
    prevWidthRef.current = width;
  });
  const prevWidth = prevWidthRef.current;

  useEffect(() => {
    // hide menu on start if mobile
    if (prevWidth === undefined && isWidthUp('sm', width)) showMenu();
    // hide filter if screen is smaller then medium on start
    if (prevWidth === undefined && isWidthUp('md', width)) showFilter();


    // when transitioning to mobile ui hide menu
    if (prevWidth === 'sm' && width === 'xs') {
      if (menu.isOpen) hideMenu();
    }
    // when transitioning to mobile ui hide filter
    if (prevWidth === 'md' && width === 'sm') {
      if (filterSheet.isOpen) hideFilter();
    }
    // when transitioning to desktop ui show menu
    if (prevWidth === 'xs' && isWidthUp('sm', width)) {
      if (!menu.isOpen) showMenu();
    }
    // when transitioning to desktop ui show filter
    if (prevWidth === 'sm' && isWidthUp('md', width)) {
      if (!filterSheet.isOpen) showFilter();
    }
  }, [
    filterSheet,
    menu,
    width,
    prevWidth,
    showFilter,
    hideFilter,
    showMenu,
    hideMenu
  ]);

  const classOverrides = Object.entries({
    shiftLeft: menu.isOpen && !filterSheet.isOpen,
    shiftRight: filterSheet.isOpen && !menu.isOpen,
    shiftBoth: filterSheet.isOpen && menu.isOpen
  }).reduce((acc, [key, value]) => ({ ...acc, [classes[key]]: value }), {});

  return (
    <div className={classes.app}>
      <Router>
        <CssBaseline />
        <AppBar />
        <MainMenu />
        <main className={classNames(classes.main, classOverrides)}>
          {isWidthDown('xs', width) && <div className={classes.toolbar} />}
          <Suspense fallback={<CircularProgress />}>
            <Switch>
              <Route path="/" exact component={Search} />
              <Route path="/bucket" exact component={Bucket} />
              <Route path="/session/:id`" exact component={Session} />
              <Route path="/user/:id" exact component={Profile} />
              <Route path="/settings" exact component={Settings} />
              <Route path="/about" exact component={About} />
              <Route path="/spot/:id" component={Spot} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </main>
        {width === 'xs' && <BottomNavigation />}
      </Router>
    </div>
  );
});

export default App;
