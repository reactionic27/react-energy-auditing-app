import React from 'react'
import {JOB_COLLECTION_TABLES} from 'data/constants'

export default function SnuggRecTitle({label, collection, uuid, deleteMin}) {
  return (
    <div className="row">
      <div className="col-sm-10 col-xs-9">
        <h4>
          {label}
        </h4>
      </div>
      <div key="del" className="col-sm-2 col-xs-3 col-no-left-gutter">
        <div className="pull-right">
          <Snugg.Buttons.CollectionDelete min={deleteMin} uuid={uuid} collection={collection} />
        </div>
      </div>
    </div>
  )
}

SnuggRecTitle.propTypes = {
  label: React.PropTypes.string.isRequired,
  collection: React.PropTypes.oneOf(JOB_COLLECTION_TABLES).isRequired,
  uuid: React.PropTypes.string.isRequired
};
