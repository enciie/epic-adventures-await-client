import React, {Component} from 'react'
import { connect } from 'react-redux'
import { increaseLike } from '../actions/tripActions'

class Likes extends Component {

  render() {
    const { trip, tripLikes } = this.props
    return (
      <div className="text-center">
        <button onClick={ () => {
          this.props.increaseLike(tripLikes + 1, trip.id)
        }}>
          Like
        </button> {tripLikes}
      </div>
    )
  }
}

export default connect(null, { increaseLike })(Likes);
