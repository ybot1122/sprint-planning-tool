import { connect } from 'react-redux'

import MyLayout from '../components/MyLayout'
import TeammateCard from '../components/TeammateCard'
import ScoreCard from '../components/ScoreCard'
import ModToolbar from '../components/ModToolbar'

const room = (props) => {
  const { bootstrap: { users, connection, localUser } } = props

  const isModerator = true
  const teammateCards = users.map((el, ind) => <TeammateCard name={el.name} score={el.score} id={el.id} key={ind} />)

  return (
    <div>
      {isModerator && <ModToolbar />}
      <div className="hero">
        <div className="teammate-cards">
          {teammateCards}
        </div>
        <div className="point-cards">
          <ScoreCard score={1} />
          <ScoreCard score={2} />
          <ScoreCard score={3} />
          <ScoreCard score={5} />
          <ScoreCard score={8} />
          <ScoreCard score={13} />
          <ScoreCard score={21} />
          <ScoreCard score={100} />
          <ScoreCard score={1000} />
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
          height: 200px;
          background: #0033A0;
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
        .toolbar {
          text-align: center;
          margin-bottom: 5px;
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
export default MyLayout(connect(mapStateToProps)(room));
