/* eslint-disable no-alert */
import React from 'react'
import io from 'socket.io-client'
const socket = io('/games')

export const Games = () => {
  socket.on('welcome', () => alert('welcome to the games lobby'))
  socket.on('join', data => {
    alert(`you have joined romm #${data.id}`)
  })
  return (
    <div>
      <h1>Games</h1>
      <button type="button" onClick={() => socket.emit('join', {id: 1})}>
        Join Game room #1
      </button>
    </div>
  )
}