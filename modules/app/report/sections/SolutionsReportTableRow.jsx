import React, {PropTypes} from 'react'
import {Map as IMap} from 'immutable'
import {times} from 'lodash'
import {Icon} from 'ui'
import * as f from 'data/formatters'
import {SOLUTIONS_TABLE} from 'app/lib/report-styles'

export default class SolutionsReportTableRow extends React.Component {

  static propTypes = {
    totals: PropTypes.instanceOf(IMap).isRequired,
    recommendation: PropTypes.instanceOf(IMap).isRequired,
    costDisplayType: PropTypes.string.isRequired,
    savingsDisplayType: PropTypes.string.isRequired,
    sirDisplayType: PropTypes.string.isRequired
  };

  render() {
    const {
      recommendation: rec, totals,
      costDisplayType, sirDisplayType, savingsDisplayType
    } = this.props
    const totalSavings = totals.get('total_savings')
    const lineItemSavings = rec.get('savings')
    const lineItemSIR = rec.get('sir')
    return (
      <tr>
        <td className="details" style={SOLUTIONS_TABLE.details}>
          {rec.get('title')}
        </td>

        {/* Don't refactor this using Snugg HOC's in the table because when elements
         are turned off, it leaves a span instead of a td and it breaks the table */}
        {costDisplayType === 'exact' &&
          <td className="costs" style={SOLUTIONS_TABLE.costs}>
            {f.num.dollars(rec.get('cost'))}
          </td>
        }
        {costDisplayType === 'rounded' &&
          <td className="costs" style={SOLUTIONS_TABLE.costs}>
            {f.num.specialCeil(rec.get('cost'))}
          </td>
        }

        {savingsDisplayType === 'lineItem' &&
          <td className="savings" style={SOLUTIONS_TABLE.savings}>
            {f.recs.isCustomRec(rec) ? 'N/A' : f.num.dollars(rec.get('savings'))}
          </td>
        }
        {savingsDisplayType === 'bars' &&
          <SavingsBars lineItemSavings={lineItemSavings} totalSavings={totalSavings} rec={rec} />
        }
        {savingsDisplayType === 'stars' &&
          <SavingsStars lineItemSavings={lineItemSavings} totalSavings={totalSavings} rec={rec} />
        }

        {sirDisplayType === 'lineItem' &&
          <SirLineItem rec={rec} />
        }
        {sirDisplayType === 'icon' &&
          <SirIcon lineItemSIR={lineItemSIR} rec={rec} />
        }
      </tr>
    );
  }
}

// ==  Savings and SIR display types ===========================================
const savingsIconTotalWidth = 100
const savingsIconHeight = 18

const SavingsBars = ({lineItemSavings, totalSavings, rec}) => {
  const savingsRatio = lineItemSavings / totalSavings
  const savingsWidth = savingsRatio * savingsIconTotalWidth
  const indicatorBar = {...savingsBarStyles.bar, width: savingsWidth}
  return (
    <td className="savings">
      {f.recs.isCustomRec(rec) ? (
        <div style={savingsStarStyles.background}>
          <div style={{float: 'left'}}>
            N/A
          </div>
        </div>
      ) : (
        <div style={savingsBarStyles.background}>
          <div style={indicatorBar} />
        </div>
      )}
    </td>
  )
}

function numberOfStars(percent) {
  switch (true) {
    case percent < 5: return 0;
    case percent < 20: return 1;
    case percent < 40: return 2;
    case percent < 60: return 3;
    case percent < 80: return 4;
    case percent >= 80: return 5;
    default: return 0
  }
}

const SavingsStars = ({lineItemSavings, totalSavings, rec}) => {
  const savingsPercent = lineItemSavings / totalSavings * 100
  const stars = numberOfStars(savingsPercent)
  return (
    <td className="savings">
      {f.recs.isCustomRec(rec) ? (
        <div style={savingsStarStyles.background}>
          <div style={{float: 'left'}}>
            N/A
          </div>
        </div>
      ) : (
        <div style={savingsStarStyles.background}>
          <div style={savingsStarStyles.stars}>
            {times(stars, (n) => <Icon type="reportSettings" size={18} key={`s${n}`}/>)}
          </div>
        </div>
      )}
    </td>
  )
}


const SirLineItem = ({rec}) => {
  return (
    <td className="sir" style={SOLUTIONS_TABLE.sir}>
      {f.recs.isCustomRec(rec) ? 'N/A' : f.num.format(rec.get('sir'), {decimals: 1})}
    </td>
  )
}

const SirIcon = ({lineItemSIR, rec}) => {
  const paysForItself = lineItemSIR >= 1
  return (
    <td className="sir" style={SOLUTIONS_TABLE.sir}>
      {(!f.recs.isCustomRec(rec) && paysForItself)
        ? <Icon type="checkMark" size={16}/>
        : <span/>
      }
    </td>
  )
}


// == styles ==============================================

const savingsBarStyles = {
  background: {
    position: 'relative',
    float: 'right',
    width: savingsIconTotalWidth,
    height: savingsIconHeight,
    backgroundColor: '#EDECEA'
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: savingsIconHeight,
    backgroundColor: 'green'
  }
}

const savingsStarStyles = {
  background: {
    position: 'relative',
    float: 'right',
    width: savingsIconTotalWidth,
    height: savingsIconHeight,
  },
  stars: {
    float: 'left',
    color: 'green'
  }
}
