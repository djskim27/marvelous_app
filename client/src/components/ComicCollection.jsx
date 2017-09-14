import React, { Component } from 'react'
import UserComicCard from './UserComicCard'


export default class ComicCollection extends Component {

  render() {
    const userComicCollection = this.props.userComicCollection
    const userComicList = userComicCollection.map((comic, i) => {
      return <UserComicCard comic={comic}/>
    })

    return (
      <div>
          {userComicList}
      </div>
    )
  }
}
