import { connect } from 'react-redux';

import Link from 'next/link';
import MyLayout from '../components/MyLayout';
import TeammateCard from '../components/TeammateCard';

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
          background: blue;
        }
        .point-cards {
          margin: 0;
          width: 100%;
          height: 200px;
          background: light-blue;
        }
        .teammate-cards {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

export default MyLayout(connect(state => state)(index));
