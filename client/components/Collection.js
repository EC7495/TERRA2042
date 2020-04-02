import React from 'react'
import {ItemTypes} from '../dnd/types'
import {useDrop} from 'react-dnd'
import {addToCollection, removeCollection} from '../store/reducers/user'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
// import {confirmAlert} from 'react-confirm-alert'
// import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-toastify/dist/ReactToastify.css'

function Collection(props) {
  const [{isOver, canDrop, item}, drop] = useDrop({
    accept: ItemTypes.DECK_CARD,
    drop: () => {
      //thunk!
      if (!props.collection.cards.map(card => card._id).includes(item.id)) {
        //thunk to add to collection.
        props.addToCollection(props.collection, item.id)
        toast.info(`${item.name} added to ${props.collection.name}`)
      } else {
        toast.warning('Card is already in the deck!')
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem()
    })
  })

  return props.collection._id ? (
    <div className="single-collection">
      <div
        onClick={props.handleClick}
        ref={drop}
        style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
      >
        <div
          className={
            props.collection.isDeck
              ? props.collection.name === 'Default Deck'
                ? 'collection default'
                : 'collection'
              : 'allCards'
          }
        >
          <p
            className="breakName"
            style={{margin: 0, padding: 0}}
          >{`${props.collection.name}`}</p>
        </div>
        {/* <span className="deckCount">
          {props.collection.cards.length}
          {props.collection.isDeck ? '/20' : ''}
          {!['Default Deck', 'My Cards'].includes(props.collection.name) ? (
            <button
              style={{marginLeft: '1vh'}}
              onClick={() =>
                confirmAlert({
                  title: 'Confirm',
                  message:
                    'Are you sure you want to permanently delete this deck?',
                  buttons: [
                    {
                      label: 'Yes',
                      onClick: () => {
                        props.removeCollection(props.collection._id)
                        localStorage.recentlyDeletedColl = props.collection._id
                      }
                    },
                    {
                      label: 'Cancel'
                    }
                  ]
                })
              }
              type="button"
            >
              X
            </button>
          ) : (
            ''
          )}
        </span> */}
      </div>
    </div>
  ) : (
    <h1>pick a deck</h1>
  )
}

const mapDispatchToProps = dispatch => ({
  addToCollection: (collection, cardId) =>
    dispatch(addToCollection(collection, cardId)),
  removeCollection: collId => dispatch(removeCollection(collId))
})
const mapStateToProps = (state, ownProps) => ({
  collection: state.user.collections.filter(
    coll => coll._id === ownProps.collection._id
  )[0]
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection)
