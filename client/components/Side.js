import React from 'react'
import Card from './Card'
import Plane from './Plane'
import {playCard, drawCard} from '../store/game'
import {connect} from 'react-redux'
import Player from './Player'

const Side = props => {
  return (
    <div className="side">
      {props.top ? (
        <div>
          <Player imgUrl={props.side.heroUrl} player={props.enemy} side="top" />
          <div className="hand">
            HAND:
            {props.opponentHand.map(card => {
              return (
                <Card card={card} key={card.id} player="enemy" inHand="true" />
              )
            })}
          </div>
          <Plane
            inPlay={props.opponentInPlay}
            playCard={card => props.playCard(props.enemy, card)}
            player="enemy"
          />
        </div>
      ) : (
        <div>
          <Plane
            inPlay={props.inPlay}
            playCard={card => props.playCard(props.player, card)}
            player="hero"
          />
          <div className="hand">
            HAND:
            {props.hand.map(card => {
              return (
                <Card card={card} key={card._id} player="hero" inHand={true} />
              )
            })}
          </div>
          <Player
            imgUrl={props.side.heroUrl}
            player={props.player}
            side="bottom"
          />
          <button
            type="submit"
            onClick={() => props.drawCard(props.player.deck)}
          >
            Draw Card Button
          </button>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = function(state) {
  return {
    inPlay: state.game.player.inPlay,
    opponentInPlay: state.game.enemy.inPlay,
    hand: state.game.player.hand,
    opponentHand: state.game.enemy.hand,
    enemy: state.game.enemy,
    player: state.game.player
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    playCard: (hero, card) => dispatch(playCard(hero, card)),
    drawCard: deck => dispatch(drawCard(deck))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Side)
