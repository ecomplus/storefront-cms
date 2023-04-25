import isEqual from 'lodash/isEqual';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import {
  clearSearch as clearSearchAction,
  searchEntries as searchEntriesAction,
} from '@staticcms/core/actions/search';
import { Cursor } from '@staticcms/core/lib/util';
import { selectSearchedEntries } from '@staticcms/core/reducers/selectors/entries';
import Entries from './Entries';

import type { ViewStyle } from '@staticcms/core/constants/views';
import type { Collections } from '@staticcms/core/interface';
import type { RootState } from '@staticcms/core/store';
import type { ConnectedProps } from 'react-redux';

const EntriesSearch = ({
  collections,
  entries,
  isFetching,
  page,
  searchTerm,
  viewStyle,
  searchEntries,
  clearSearch,
}: EntriesSearchProps) => {
  const collectionNames = useMemo(() => Object.keys(collections), [collections]);

  const getCursor = useCallback(() => {
    return Cursor.create({
      actions: Number.isNaN(page) ? [] : ['append_next'],
    });
  }, [page]);

  useEffect(() => {
    return () => {
      clearSearch();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [prevSearch, setPrevSearch] = useState('');
  const [prevCollectionNames, setPrevCollectionNames] = useState<string[]>([]);
  useEffect(() => {
    // check if the search parameters are the same
    if (prevSearch === searchTerm && isEqual(prevCollectionNames, collectionNames)) {
      return;
    }

    setPrevSearch(searchTerm);
    setPrevCollectionNames(collectionNames);

    setTimeout(() => {
      searchEntries(searchTerm, collectionNames);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionNames, prevCollectionNames, prevSearch, searchTerm]);

  return (
    <Entries
      cursor={getCursor()}
      collections={collections}
      entries={entries}
      isFetching={isFetching}
      viewStyle={viewStyle}
    />
  );
};

interface EntriesSearchOwnProps {
  searchTerm: string;
  collections: Collections;
  viewStyle: ViewStyle;
}

function mapStateToProps(state: RootState, ownProps: EntriesSearchOwnProps) {
  const { searchTerm, collections, viewStyle } = ownProps;
  const collectionNames = Object.keys(collections);
  const isFetching = state.search.isFetching;
  const page = state.search.page;
  const entries = selectSearchedEntries(state, collectionNames);
  return { isFetching, page, collections, viewStyle, entries, searchTerm };
}

const mapDispatchToProps = {
  searchEntries: searchEntriesAction,
  clearSearch: clearSearchAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type EntriesSearchProps = ConnectedProps<typeof connector>;

export default connector(EntriesSearch);
