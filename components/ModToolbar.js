import { connect } from 'react-redux'
import { toggleShowCards, resetScores } from '../actions/actions'

const ModToolbar = (props) => {
  const { bootstrap: { users, connection, localUser, showCards }, dispatch } = props;
  const showCardsText = (showCards) ? 'Hide Cards' : 'Show Cards'

  return (
    <div className="toolbar">
      <span onClick={() => dispatch(toggleShowCards(!showCards))}>{showCardsText}</span>
      <span onClick={() => dispatch(resetScores())}>Reset</span>
      <style jsx>{`
        .toolbar {
          text-align: center;
          margin: 15px;
        }
        .toolbar span:hover {
          cursor: pointer;
          border-color: #000;
        }
        .toolbar span {
          background-color: #f1f1f1;
          border: 1px solid #999;
          border-radius: 4px;
          padding: 3px;
          color: #444;
          font-size: 12px;
          margin: 0 10px;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = (state) => state
export default connect(mapStateToProps)(ModToolbar);
