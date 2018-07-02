import { connect } from 'react-redux'
import EditableName from './EditableName'
import * as proptypes from 'prop-types'
import { COFFEE, QUESTION, UNDECIDED } from '../constants/scores'


const TeammateCard = (props) => {
  const { score, name, id, bootstrap: { showCards, localUser } } = props
  const isLocalUser = id === localUser.id

  let scoreDisplay = score;
  if (!showCards) {
    scoreDisplay = ''
  } else if (score === QUESTION) {
    scoreDisplay = '?'
  } else if (score === UNDECIDED) {
    scoreDisplay = '-'
  } else if (score === COFFEE) {
    scoreDisplay = <img src="/static/coffee.png" style={{height: '20px'}} />
  }

  return (
    <div className="teammate-card--outer">
      <div className="teammate-card--inner">
        {isLocalUser ? <h3><EditableName /></h3> : <h3>{name}</h3>}
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

        h3 {
          height: 21px;
          line-height: 21px;
          font-size: 21px;
        }

        h4 {
          height: 35px;
          line-height: 35px;
          font-size: 35px;
        }
      `}</style>
    </div>
  )
}

TeammateCard.propTypes = {
  name: proptypes.string,
  score: proptypes.number,
  id: proptypes.number,
}

export default connect(state => state)(TeammateCard)
