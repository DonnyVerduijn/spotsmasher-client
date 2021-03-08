import React, { memo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronRight } from '@material-ui/icons';
import { hide as hideFilterSheet } from './../../mutations/FilterSheet';
import { Toolbar, IconButton } from '@material-ui/core';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(1)
  }
}));

const useIconButtonStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  }
}));

const FilterSheetHeader = () => {
  const toolbar = useToolbarStyles();
  const iconButton = useIconButtonStyles();
  const [hide] = useMutation(hideFilterSheet, {
    ignoreResults: true
  });
  return (
    <Toolbar disableGutters classes={toolbar}>
      <IconButton onClick={hide} classes={iconButton}>
        <ChevronRight />
      </IconButton>
    </Toolbar>
  );
};

export default memo(FilterSheetHeader);
