import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchUser } from '../actions/userActions'
import { fetchTrips } from '../actions/tripActions'

import TripCard from '../components/TripCard'

import '../stylesheets/Trip.css'

class Trips extends Component {

  constructor(props){
    super(props);
    this.state = {
      sortedTrips: false
    }
  }

  componentDidMount() {
    this.props.fetchUser()
    this.props.fetchTrips()
  }

  handleSort = () => {
    this.setState({sortedTrips: !this.state.sortedTrips})
  }

  renderTrips = (trips) => {

    const tripList = trips.slice(0)
    if (this.state.sortedTrips === true) {
      tripList.sort(function(a, b){
        const nameA = a.username.toUpperCase();
        const nameB = b.username.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
      return tripList.map(trip => <TripCard key={trip.id} trip={trip} />)
    }
    else {
      tripList.sort(function(a, b) {
        if (a.id < b.id){
          return 1;
        } else if (a.id > b.id){
          return -1;
        } else {
          return 0;
        }
      });
      return tripList.map(trip => <TripCard key={trip.id} trip={trip} />)
    }
  }

  render() {
    const { user, trips } = this.props

    return (
      <div>

        <div className="TripListContainter">
          <p className="Username">Logged in as: {user.username}</p>
          <h1 className="Header">ADVENTURE AWAITS</h1>
          <button className="sort-button" onClick={this.handleSort}>Sort By User</button>
          {this.renderTrips(trips)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        user: state.user.current,
        trips: state.trips.all
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUser,
    fetchTrips
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trips))
