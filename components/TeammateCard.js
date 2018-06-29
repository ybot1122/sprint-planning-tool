import * as proptypes from 'prop-types'

const TeammateCard = (props) => (
  <div className="teammate-card--outer">
    <div className="teammate-card--inner">
      <h3>Toby L</h3>
      <h4>3</h4>
    </div>

    <style jsx>{`
      .teammate-card--outer {
        width: 150px;
        margin: 10px;
        background: silver;
      }

      .teammate-card--inner {
        margin: 3px;
        text-align: center;
      }
    `}</style>
  </div>
)

TeammateCard.propTypes = {
  name: proptypes.string,
  description: proptypes.string,
  url: proptypes.string,
  ogImage: proptypes.string
}

export default TeammateCard
