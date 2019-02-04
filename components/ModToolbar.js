import { connect } from 'react-redux'
import { toggleShowCards } from '../actions/actions'

const ModToolbar = (props) => {
  const { bootstrap: { users, connection, localUser }, dispatch } = props;

  return (
    <div className="toolbar">
      <span onClick={() => dispatch(toggleShowCards())}>Show/Hide Cards</span>
      <style jsx>{`
        .toolbar {
          text-align: center;
          margin: 15px;
        }
        .toolbar span:hover {
          cursor: pointer;
          color: blue;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = (state) => state
export default connect(mapStateToProps)(ModToolbar);
