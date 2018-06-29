import { connect } from 'react-redux'

import * as proptypes from 'prop-types'
import { COFFEE, QUESTION, UNDECIDED } from '../constants/scores'

const TeammateCard = (props) => {
  const { score, name, bootstrap: { showCards } } = props

  let scoreDisplay = <h4>{score}</h4>;
  if (!showCards) {
    scoreDisplay = <h4>-</h4>
  } else if (score === QUESTION) {
    scoreDisplay = <h4>?</h4>
  } else if (score === UNDECIDED) {
    scoreDisplay = <h4>-</h4>
  } else if (score === COFFEE) {
    scoreDisplay = <h4><img src="/static/coffee.png" style={{height: '20px'}} /></h4>
  }

  return (
    <div className="teammate-card--outer">
      <div className="teammate-card--inner">
        <h3>{name}</h3>
        <h4>{scoreDisplay}</h4>
      </div>

      <style jsx>{`
        .teammate-card--outer {
          display: inline-block;
          width: 150px;
          margin: 10px;
          background: #ABCAE9;
          position: relative;
        }

        .teammate-card--inner {
          margin: 3px;
          text-align: center;
        }

        h4 {
          font-size: 35px;
        }
      `}</style>
    </div>
  )
}

TeammateCard.propTypes = {
  name: proptypes.string,
  score: proptypes.number,
}

export default connect(state => state)(TeammateCard)
