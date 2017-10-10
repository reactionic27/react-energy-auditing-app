import React from 'react'
import {Map as IMap} from 'immutable'

import CollectionAddButton from './CollectionAddButton'
import CollectionDeleteButton from './CollectionDeleteButton'
import CollectionLabel from './CollectionLabel'
import SnuggRecTitle from './SnuggRecTitle'
import SnuggRecRow from './SnuggRecRow'
import SnuggFields from './SnuggFields'

// SnuggFields makes Snugg.Input, Snugg.Radio, etc avaialble as a global
var Snugg = {
  ...SnuggFields
};

Snugg.mapCollection = function(collection: string | Array<IMap>, fn) {
  return collection.map((row, i) => (
    React.cloneElement(fn(row.get('uuid'), i + 1), {key: row.get('uuid')})
  ))
};

Snugg.Rec = {};
Snugg.Rec.Title = SnuggRecTitle
Snugg.Rec.Row = SnuggRecRow
Snugg.CollectionLabel = CollectionLabel

Snugg.Buttons = {
  CollectionAdd: CollectionAddButton,
  CollectionDelete: CollectionDeleteButton
}

export default Snugg;
