import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {GamesLobby} from './components/GamesLobby'
import Collection from './components/Collection'
import {Shop} from './components/Shop'
import Board from './components/Board'
import NotFound from './components/not-found'
import {me} from './store'
import CollectionList from './components/CollectionList'
import Chat from './components/Chat'
import Room from './components/Room'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/lobby" component={GamesLobby} />
            <Route
              exact
              path="/games/rooms/:roomId"
              render={({match}) => <Room match={match} />}
            />
            <Route path="/games/rooms/:roomId/game/:id">
              <div id="board-chat">
                <Board />
                <Chat />
              </div>
            </Route>
            {/* <Route path="/games/rooms/:roomId/game/:id" component={Board} /> */}
            <Route path="/decks" component={CollectionList} />
            <Route path="/home" component={UserHome} />
            <Route exact path="/" component={UserHome} />
            <Route path="/shop" component={Shop} />
            <Route path="/collection" component={Collection} />
            <Route component={NotFound} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route exact path="/" component={Login} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user._id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
