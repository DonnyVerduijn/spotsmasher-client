import { update as updateSpotMap } from './SpotMap';
import {
  show as showMainMenu,
  hide as hideMainMenu,
  toggle as toggleMainMenu
} from './MainMenu';
import {
  show as showFilterSheet,
  hide as hideFilterSheet
} from './FilterSheet';
import { set as setOrderingFilter } from './OrderingFilter';
import { update as updateAttributeValue } from './AttributeValue';
import { update as updateRangeFilter } from './RangeFilter';
import { unlock as unlockSpot } from './Spot';
import { add as addSpotToSelection } from './SpotSelection';
import { update as updateSearchField } from './SearchField';

export const resolvers = {
  Mutation: {
    updateSpotMap,
    updateAttributeValue,
    updateRangeFilter,
    showMainMenu,
    hideMainMenu,
    toggleMainMenu,
    showFilterSheet,
    hideFilterSheet,
    setOrderingFilter,
    unlockSpot,
    addSpotToSelection,
    updateSearchField
  }
};
