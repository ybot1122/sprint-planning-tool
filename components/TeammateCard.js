import { connect } from 'react-redux'
import EditableName from './EditableName'
import * as proptypes from 'prop-types'
import { COFFEE, QUESTION, UNDECIDED } from '../constants/scores'


const TeammateCard = (props) => {
  const { score, name, id, bootstrap: { showCards, userId } } = props
  const isLocalUser = id === userId

  let scoreDisplay = score
  let h4cname = ''
  if (!showCards && !isLocalUser) {
    scoreDisplay = 'x'
    h4cname = 'camo'
  } else if (score === QUESTION) {
    scoreDisplay = '?'
  } else if (score === UNDECIDED) {
    scoreDisplay = '-'
  } else if (score === COFFEE) {
    scoreDisplay = <img src="/static/coffee.png" style={{height: '20px'}} />
  }
  const readyIndicator = (score) ? 'O' : null;
  return (
    <div className="teammate-card--outer">
      <div className="teammate-card--inner">
        {isLocalUser ? <h3><EditableName /></h3> : <h3>{name}</h3>}
        <h4 className={h4cname}>{scoreDisplay}</h4>
      </div>
      <div className="teammate-card--ready">{readyIndicator}</div>

      <style jsx>{`
        .teammate-card--outer {
          display: inline-block;
          width: 150px;
          height: 180px;
          margin: 10px;
          background: #ABCAE9;
          position: relative;
        }

        .teammate-card--inner {
          margin: 3px;
          text-align: center;
        }

        h3 {
          height: 21px;
          line-height: 21px;
          font-size: 12px;
        }

        h4 {
          height: 35px;
          line-height: 35px;
          font-size: 35px;
          min-width: 10px;
          display: block;
        }

        h4.camo {
          color: #ABCAE9;
        }

        .teammate-card--ready {
          position: absolute;
          right: 5px;
          color: green;
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
