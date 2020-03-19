import React from 'react'
import Card from './Card'
import {ItemTypes} from '../dnd/types'
import {useDrop} from 'react-dnd'

const Plane = props => {
  const [{isOver, canDrop, item}, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      if (props.player === 'hero' && item.inHand === true) {
        props.playCard(item.card)
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem()
    })
  })

  return (
    <div className="plane" ref={drop}>
      PLANE:
      {props.inPlay.map(card => {
        return (
          <Card
            card={card}
            key={card.id}
            player={props.player}
            inHand={false}
          />
        )
      })}
    </div>
  )
}

export default Plane
