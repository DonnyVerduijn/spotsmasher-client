import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { useQuery } from './../../utils/apollo/helpers';
import getFilterSheet from './../../queries/local/getFilterSheet';
import getMainMenu from './../../queries/local/getMainMenu';

const useStyles = makeStyles(theme => ({
  Wrapper: {
    position: 'fixed',
    background: 'white',
    zIndex: 20,
    width: '100%'
  },
  InfoBar: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row'
  },
  Panel: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(3, 3)
  },
  shiftLeft: {
    [theme.breakpoints.up('sm')]: {
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
    [theme.breakpoints.between('md', 'xl')]: {
      marginRight: theme.filterSheet.small,
      width: `calc(100% - ${theme.filterSheet.small + theme.mainMenu.width}px)`
    },
    [theme.breakpoints.up('xl')]: {
      marginRight: theme.filterSheet.big,
      width: `calc(100% - ${theme.filterSheet.big + theme.mainMenu.width}px)`
    }
  },
  toolbar: theme.mixins.toolbar
}));

const InfoBar = ({ className, children }) => {
  const classes = useStyles();
  const filterSheet = useQuery(getFilterSheet);
  const menu = useQuery(getMainMenu);
  const classOverrides = Object.entries({
    shiftLeft: menu.isOpen && !filterSheet.isOpen,
    shiftRight: filterSheet.isOpen && !menu.isOpen,
    shiftBoth: filterSheet.isOpen && menu.isOpen
  }).reduce((acc, [key, value]) => ({ ...acc, [classes[key]]: value }), {});
  return (
    <>
      <section className={classNames(classes.Wrapper, className, classOverrides)}>
        <Toolbar className={classes.InfoBar}>{children}</Toolbar>
        <Divider />
      </section>
      <div className={classes.toolbar} />
    </>
  );
};

InfoBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

export default memo(InfoBar);
