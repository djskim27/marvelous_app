import React, { Component } from 'react'

export default class HomePage extends Component {
  render() {
    const comics = this.props.comics
    const comicList = comics.map((comic, i) => {
      return(
        <div key = {i}>
          <h1>I am a card</h1>
        </div>
      )
    })
    return (
      <div>
        This is HomePage
        {comicList}
      </div>
    )
  }
}
