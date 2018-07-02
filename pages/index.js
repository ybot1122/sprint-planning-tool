import { connect } from 'react-redux'
import Link from 'next/link'

import MyLayout from '../components/MyLayout'
import { ROOM } from '../constants/routes';

import { apiOpenConnection } from '../actions/actions'

const index = (props) => {
  const { bootstrap: { users, connection, localUser } } = props;
  const onJoinCreateClick = () => {
    if (!connection.isConnected && !connection.isLoading) {
      props.openSocketConnection(users.find((el) => el.id === localUser.id).name, this.roomNameInput)
    }
  }

  return (
    <div>
      <div className="hero">
        <div className="frame">
          <input
            type="text"
            placeholder="enter-room-name-here"
            onChange={(e) => this.roomNameInput = e.target.value}>
          </input>
          <h1><Link href={ROOM}><span onClick={onJoinCreateClick}>join/create</span></Link></h1>
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .frame {
          margin: 0;
          width: 100%;
          color: #0033A0;
          text-align: center;
        }
        input {
          font-size: 30px;
          height: 30px;
          line-height: 30px;
          padding: 3px;
        }

        h1 {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = (state) => state
const bindActionsToDispatch = (dispatch) => ({
  openSocketConnection: (name, room) => dispatch(apiOpenConnection(name, room))
})

export default MyLayout(connect(mapStateToProps, bindActionsToDispatch)(index));
