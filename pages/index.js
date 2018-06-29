import { connect } from 'react-redux';

import Link from 'next/link';
import MyLayout from '../components/MyLayout';
import TeammateCard from '../components/TeammateCard';
import ScoreCard from '../components/ScoreCard';

const index = (props) => {
  console.log('Home Page', props)
  return (
    <div>
      <div className="hero">
        <div className="teammate-cards">
          <TeammateCard name="Toby" score={3} />
          <TeammateCard name="Someone" score={3} />
          <TeammateCard name="Other G" score={2} />
          <TeammateCard name="This Pers" score={1} />
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
      `}</style>
    </div>
  )
}

export default MyLayout(connect(state => state)(index));
