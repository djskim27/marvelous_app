import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'
import UserComicShow from './UserComicShow'
import Modal from 'react-modal';
import FaClose from 'react-icons/lib/fa/close'

const customStyles = {
    
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(150, 20, 8, 0.46)'
    },
    content : {
      position                   : 'absolute',
      top                        : '10%',
      left                       : '10%',
      right                      : '10%',
      bottom                     : '5%',
      border                     : '1px solid #ccc',
      background                 : 'rgba(0,0,0,0.85)',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '4px',
      outline                    : 'none',
      padding                    : '20px'
    }

  
  
  
  }

const ComicCard = styled.div`
margin: 5%;
img {
    width: 200px;
    height: 304px;
    margin: 10px;
    transition: 1s ease;
    border: white 4px solid;
}
img:hover{
    -webkit-transform: scale(1.05) rotateZ(-1deg);
    -ms-transform: scale(1.05) rotateZ(-1deg);
    transform: scale(1.05) rotateZ(-1deg);
    transition: 1s ease;
}
`
const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-around;
`
export default class UserComicCard extends Component {
    constructor(){
        super();
        this.state = {
            redirect: false,
            setBG: false,
            isActive: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

_changeBackground = () => {
   console.log()
    // this.props.backgroundImage(this.props.comic.thumbnail)
}

_setBG = () => {
    this.setState({setBG: true})
}

openModal = () => {
    this.setState({
        isActive: true
    })
}

closeModal = () => {
    this.setState({
        isActive: false
    })
}

  render() {
      const comics = this.props.comic
    return (
    <div>
      <ComicCard>
 
          <img src={this.props.comic.thumbnail} onClick={this.openModal}/>
          <Modal isOpen={this.state.isActive} style={customStyles} contentLabel="Example Modal" className='shadow' onRequestClose={this.closeModal} shouldCloseOnOverlayClick={true}>
                
            <UserComicShow comicId = {this.props.comic.api_id}/>
            <br/>
            <br/>
            <br/>
            <ButtonDiv><button onClick={this.closeModal} className='marvel-btn'><FaClose size={30}/></button></ButtonDiv>

            
         </Modal>
       

      </ComicCard>
      <ButtonDiv>
      <button className='btn marvel-btn' onClick={this._deleteComic}>Delete</button>
      <button className='btn marvel-btn' onClick={() => {this.props.backgroundImage(this.props.comic.thumbnail)}}>Set BG</button>
      </ButtonDiv>
      </div>
    )
  }
}

