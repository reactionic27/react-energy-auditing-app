import React from 'react'
import {Icon} from 'ui'
import {Link} from 'react-router';
import FinancingToggle from './toggle'
import Radium from 'radium'
import {palette} from 'app/lib/global-styles'
import Color from 'color'

const RadiumLink = Radium(Link)

@Radium
export default class JobFinancingHeader extends React.Component {

  render() {
    const {product, jobId, isSample, selectedCount} = this.props
    const productTitle = product.get('title')
    return (
      <div style={styles.header}>
        {isSample ?
          <div>
            <div style={styles.title} key='radium-title'>{productTitle} <Icon type="edit" size={14}/></div>
            <div style={styles.subtitle}>Origin: Sample product</div>
          </div>
          :
          <RadiumLink to={`/job/${jobId}/financing/edit/${product.get('uuid')}`} style={styles.link}>
            <div style={styles.title} key='radium-title'>{productTitle} <Icon type="edit" size={14}/></div>
            {/*<div style={styles.subtitle}>Origin: insert_origin_product_here</div>*/}
          </RadiumLink>
        }
        <div>
          <div style={{float:'right'}}>
            <Snugg.Buttons.CollectionDelete uuid={product.get('uuid')} min={0} collection="jobFinancing" />
          </div>
          <FinancingToggle uuid={product.get('uuid')} isSample={isSample} selectedCount={selectedCount} />
        </div>
      </div>
    )
  }
}

const styles = {
  header: {
    borderRadius: '6px 6px 0 0',
    background: palette.BEIGE,
    borderBottom: `1px solid ${Color(palette.BEIGE).darken(0.05).rgbString()}`,
    padding: '15px 10px 5px',
    display:'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'flex-start',
    '@media (min-width: 768px)': {
      padding: '15px 15px 5px'
    }
  },
  title: {
    fontSize: 16,
    color: palette.BROWN,
    '@media (min-width: 768px)': {
      fontSize: 20
    }
  },
  link: {
    paddingTop: 5,
    paddingRight: 3,
    paddingBottom: 5,
    paddingLeft: 3,
    borderRadius: 3,
    ':hover': {
      backgroundColor: Color(palette.BEIGE).darken(0.08).rgbString()
    },
    ':active' : {
      backgroundColor: Color(palette.BEIGE).darken(0.15).rgbString()
    }
  },
  subtitle: {
    fontSize: 11,
    color: `#7E7E7E`
  },
}
