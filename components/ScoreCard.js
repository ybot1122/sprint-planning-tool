import * as proptypes from 'prop-types'

const question = 100
const coffee = 1000

const ScoreCard = (props) => {
  let scoreDisplay = <h4>{props.score}</h4>;
  if (props.score === question) {
    scoreDisplay = <h3>?</h3>
  } else if (props.score === coffee) {
    scoreDisplay = <h3>Coffee</h3>
  }

  return (
    <div className="score-card--outer">
      <div className="score-card--inner">
        {scoreDisplay}
      </div>

      <style jsx>{`
        .score-card--outer {
          display: inline-block;
          width: 50px;
          margin: 10px;
          background: #ABCAE9;
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
  score: proptypes.number,
}

export default ScoreCard
