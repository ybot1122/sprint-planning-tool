import { connect } from 'react-redux'
import * as proptypes from 'prop-types'

import { updateScore } from '../actions/actions'
import { COFFEE, QUESTION } from '../constants/scores'

const scoreValueStyle = {
  margin: 0,
  padding: 0
}

const ScoreCard = (props) => {
  console.log('ScoreCard:', props);
  const { bootstrap: { localUser: { id }, users }, score, dispatch } = props
  const currentScore = users[id].score

  let scoreDisplay = <h4 style={scoreValueStyle}>{score}</h4>;
  if (score === QUESTION) {
    scoreDisplay = <h4 style={scoreValueStyle}>?</h4>
  } else if (score === COFFEE) {
    scoreDisplay = <h4 style={scoreValueStyle}><img src="/static/coffee.png" style={{height: '20px'}} /></h4>
  }

  const cname = (currentScore === score) ? 'score-card--outer score-value-active' : 'score-card--outer'
  return (
    <div className={cname} onClick={() => dispatch(updateScore(id, score))}>
      <div className="score-card--inner">
        {scoreDisplay}
      </div>

      <style jsx>{`
        .score-card--outer {
          display: inline-block;
          margin: 0 5px;
          height: 40px;
          width: 50px;
          line-height: 40px;
          background: #ABCAE9;
          border: 2px white solid;
        }

        .score-card--outer:hover, .score-value-active {
          border: 2px black solid;
          cursor: pointer;
        }

        .score-card--inner {
          margin: 3px;          
          text-align: center;
        }
      `}</style>
    </div>
  )
}

ScoreCard.propTypes = {
  score: proptypes.number.isRequired,
}

export default connect(state => state)(ScoreCard)
