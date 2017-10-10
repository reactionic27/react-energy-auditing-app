import React from 'react'
import cx from 'classnames'
import pure from 'pure-render-decorator'
import {browser as Bowser} from 'bowser'
@pure
export default class JobSortSearchFilter extends React.Component {

  state = {
    searchInput: ''
  };

  handleInputChange = (e) => {
    this.props.filterChange(e.target.value)
  };

  clearAndFocusInput = (e) => {
    this.props.filterChange('')
    this.focusInput()
  };

  focusInput = () => {
    this.refs.searchInput.focus()
  };

  render() {
    if (Bowser.mobile || Bowser.tablet) {
      return null
    }

    return (
      <div className='search-jobs'>
        <form className="form-search" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <div className="input-group col-xs-12">
              <span className="input-group-addon search-icon" onClick={this.focusInput}>
                <i className="ico-budicon-2"></i>
              </span>
              <input
                type="text"
                ref="searchInput"
                className="form-control input-lg search-query"
                value={this.props.searchInput}
                onChange={this.handleInputChange} />
              <span className={cx({'search-clear' : this.state.searchInput !== ''}) + " input-group-addon"} onClick={this.clearAndFocusInput}>
                <i className="ico-budicon-17"></i>
              </span>
            </div>
          </div>
        </form>
      </div>
    )
  }
};
