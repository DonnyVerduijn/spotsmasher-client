import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from './SearchIcon';
import { SearchInput } from './SearchInput';
import { SearchPredictionList } from './SearchPredictionList';
import { makeStyles } from '@material-ui/core/styles';
import uuid from 'uuidv4';
import debounce from 'lodash.debounce';
import { fade } from '@material-ui/core/styles/colorManipulator';
import getSearchField from './../../queries/local/getSearchField';
import { useLocalQuery } from './../../utils/apollo/helpers';
import { useMutation } from '@apollo/react-hooks';
import classnames from 'classnames';
import { update as updateSearchField } from './../../mutations/SearchField';

const SESSION_TOKEN_TRESHOLD = 3 * 60 * 1000;

const useStyles = makeStyles(theme => ({
  SearchField: {
    flexGrow: 1,
    maxWidth: '40em',
    position: 'relative',
    // margin: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.30)
    },
    [theme.breakpoints.up('sx')]: {
      marginLeft: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  visible: {
    display: 'block'
  }
}));

export const SearchField = ({ updateSelectedPlace, fetchPredictions }) => {
  const classes = useStyles();
  const SearchField = useLocalQuery(getSearchField);
  const [hideSearchField] = useMutation(updateSearchField, {
    variables: { isVisible: false },
    ignoreResults: true
  });
  const [sessiontoken, setSessiontoken] = useState(uuid());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState('');
  const [predictions, setPredictions] = useState([]);
  const postponeSessiontokenRenewal = debounce(() => {
    setSessiontoken(uuid());
  }, SESSION_TOKEN_TRESHOLD);

  const onKeyDownHandlers = {
    ArrowDown: () => {
      if (selectedIndex < predictions.length - 1) {
        if (isOpen) {
          setSelectedIndex(selectedIndex + 1);
        } else {
          setIsOpen(true) || setSelectedIndex(0);
        }
      }
    },
    ArrowUp: () => {
      if (isOpen && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    },
    Escape: () => {
      setSelectedIndex(0);
      setIsOpen(false);
    },
    Enter: () => {
      setSelectedIndex(0);
      setIsOpen(false);
      setValue(predictions[selectedIndex].description);
      updateSelectedPlace(predictions[selectedIndex].place_id);
      fetchPredictions({
        input: predictions[selectedIndex].description,
        offset: predictions[selectedIndex].description.length,
        sessiontoken
      }).then(setPredictions);
      setSessiontoken(uuid());
    }
  };

  return (
    <div
      className={classnames(classes.SearchField, {
        [classes.visible]: SearchField && SearchField.isVisible
      })}
    >
      <SearchIcon />
      <SearchInput
        onBlur={() => {
          hideSearchField();
          setIsOpen(false);
          setSelectedIndex(0);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={e => {
          if (onKeyDownHandlers[e.key]) {
            onKeyDownHandlers[e.key](e);
          }
        }}
        onChange={e => {
          fetchPredictions({
            input: e.target.value,
            offset: e.target.selectionStart,
            sessiontoken
          }).then(setPredictions);
          postponeSessiontokenRenewal();
          setIsOpen(true);
          setValue(e.target.value);
        }}
        value={value}
      />
      <SearchPredictionList
        onPredictionClicked={prediction => {
          setSessiontoken(uuid());
          setValue(prediction.description);
          updateSelectedPlace(prediction.place_id);
        }}
        predictions={predictions}
        isOpen={isOpen}
        selectedIndex={selectedIndex}
      />
    </div>
  );
};

SearchField.propTypes = {
  updateSelectedPlace: PropTypes.func,
  fetchPredictions: PropTypes.func
};

SearchField.defaultProps = {
  value: ''
};
