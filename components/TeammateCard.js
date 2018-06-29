import * as proptypes from 'prop-types'

const TeammateCard = (props) => (
  <div className="teammate-card--outer">
    <div className="teammate-card--inner">
      <h3>{props.name}</h3>
      <h4>{props.score}</h4>
    </div>

    <style jsx>{`
      .teammate-card--outer {
        display: inline-block;
        width: 150px;
        margin: 10px;
        background: silver;
        position: relative;
      }

      .teammate-card--inner {
        margin: 3px;
        text-align: center;
      }

      h4 {
        font-size: 35px;
      }
    `}</style>
  </div>
)

TeammateCard.propTypes = {
  name: proptypes.string,
  score: proptypes.number,
}

export default TeammateCard
