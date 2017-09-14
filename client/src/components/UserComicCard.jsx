import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class UserComicCard extends Component {
    constructor(){
        super();
        this.state = {
            redirect: false
        }
    }

_deleteComic = async() => {
    try {
        const res = await axios.delete(`/api/comics/${this.props.comic.id}`)
        // this.setState({redirect: true})
        await this.props.fetch();
        return res.data
    }
    catch(err) {
        console.log(err)
    }
}

  render() {
      const comics = this.props.comic
    return (
      <div>
 
          <img src={this.props.comic.thumbnail}/>
            <button onClick={this._deleteComic}>Delete From Collection</button>
       

      </div>
    )
  }
}

