import { connect } from 'react-redux'
import { updateName } from '../actions/actions'

const EditableName = (props) => {
  const { dispatch, bootstrap: { userId, users, name } } = props

  return (
    <div className="editablename--outer">
      <input
        type="text"
        defaultValue={name}
        onKeyUp={() => dispatch(updateName(userId, this.nameInput))}
        onChange={(e) => this.nameInput = e.target.value}>
      </input>

      <style jsx>{`
        .editablename--outer {
          display: inline-block;
          margin: 0;
          padding: 0;
        }

        input {
          margin: 0;
          padding: 0 3px;
          width: 100px;
          border: none;
          border-bottom: 1px black solid;
          background: #ABCAE9;
          font-size: 12px;
          line-height: 21px;
          height: 21px;
          box-shadow: none;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export default connect(state => state)(EditableName)
