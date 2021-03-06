import { connect } from 'react-redux';

import MyLayout from '../components/MyLayout';

const about = (props) => {
  console.log('About Page', props)
  return (
    <div>
      <div className="hero">
        <h1>About Section</h1>
        <p>This is a tool designed to help during estimating.</p>
        <p>Let me know how you like it</p>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
          text-align: center;
        }

        h1 {
          text-align: center;
          font-size: 3em;
        }

      `}</style>
    </div>
  )
}

export default MyLayout(connect(state => state)(about))
