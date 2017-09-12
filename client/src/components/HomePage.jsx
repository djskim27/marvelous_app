import React, { Component } from 'react'
import ComicIndex from './ComicIndex'

export default class HomePage extends Component {
  render() {

    return (
      <div>
        <ComicIndex comics = {this.props.comics}/>
      </div>
    )
  }
}
