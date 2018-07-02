import { connect } from 'react-redux'
import Link from 'next/link'

import MyLayout from '../components/MyLayout'
import { ROOM } from '../constants/routes';

const room = (props) => {
  const { bootstrap: { users, connection, localUser } } = props;

  return (
    <div>
      <div className="hero">
        <div className="teammate-cards">
          <h1>Join a room</h1>
          <h4>or</h4>
          <h1><Link href={ROOM}>Create a room</Link></h1>
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .teammate-cards {
          margin: 0;
          width: 100%;
          color: #0033A0;
        }
        .point-cards {
          margin: 20px 0;
          width: 100%;
          height: 100px;
          background: light-blue;
        }
        .teammate-cards, .point-cards {
          text-align: center;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = (state) => state

export default MyLayout(connect(mapStateToProps)(room));
