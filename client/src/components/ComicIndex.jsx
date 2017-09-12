import React, { Component } from 'react'
import ComicIndexCard from './ComicIndexCard'

export default class ComicIndex extends Component {
  render() {
    const comics = this.props.comics
    const comicList = comics.map((comic, i) => {
      return(
        <div key={i}>
          <ComicIndexCard comic = {comic}/>
        </div>
      )
    })
    return (
      <div>
      {comicList}
      </div>
    )
  }
}
