import * as proptypes from 'prop-types'

const ScoreCard = (props) => (
  <div className="score-card--outer">
    <div className="score-card--inner">
      <h4>{props.score}</h4>
    </div>

    <style jsx>{`
      .score-card--outer {
        width: 150px;
        margin: 10px;
        background: silver;
      }

      .score-card--inner {
        margin: 3px;
        text-align: center;
      }
    `}</style>
  </div>
)

ScoreCard.propTypes = {
  score: proptypes.number,
}

export default ScoreCard
