import { connect } from 'react-redux'
import Link from 'next/link'

import MyLayout from '../components/MyLayout'
import { ROOM } from '../constants/routes';

import { apiOpenConnection } from '../actions/actions'

const index = (props) => {
  const { bootstrap: { name, connection } } = props;
  const generatedRoomId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

  return (
    <div>
      <div className="hero">
        <div className="frame">
          <h1><Link href={ROOM + '/' + generatedRoomId}><span>Create Room</span></Link></h1>
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
