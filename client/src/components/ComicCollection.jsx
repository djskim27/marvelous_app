import React, { Component } from 'react'
import UserComicCard from './UserComicCard'


export default class ComicCollection extends Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount(){
    this.props.fetchUserComicCollection()
  }

  render() {
    const userComicCollection = this.props.userComicCollection
    const userComicList = userComicCollection.map((comic, i) => {
      return <UserComicCard comic={comic} fetch={this.props.fetchUserComicCollection}/>
    })

    return (
      <div>
          {userComicList}
      </div>
    )
  }
}
