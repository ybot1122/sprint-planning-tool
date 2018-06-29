import * as proptypes from 'prop-types'

const question = 100
const scoreValueStyle = {
  margin: 0,
  padding: 0
}
const coffee = 1000

const ScoreCard = (props) => {
  let scoreDisplay = <h4 className="score-value" style={scoreValueStyle}>{props.score}</h4>;
  if (props.score === question) {
    scoreDisplay = <h4 className="score-value" style={scoreValueStyle}>?</h4>
  } else if (props.score === coffee) {
    scoreDisplay = <h4 style={scoreValueStyle}><img src="/static/coffee.png" className="coffee" style={{height: '20px'}} /></h4>
  }

  return (
    <div className="score-card--outer">
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

        .score-card--outer:hover {
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
  score: proptypes.number,
}

export default ScoreCard
