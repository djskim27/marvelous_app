import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import ComicShow from './ComicShow'
import FaClose from 'react-icons/lib/fa/close'



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
justify-content: center;
align-item: center;
`
//for modal
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

export default class ComicImageCard extends Component {
    constructor(){
        super();
        this.state = {
            isActive: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
    const comic = this.props.comic;

    return (
        <div>

                {comic.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'?
                <ComicCard> <img src={`https://i.imgur.com/yLppAf3.png`} /> </ComicCard>
                :
                <ComicCard> 
                <img src={`${comic.thumbnail.path}.jpg`} onClick={this.openModal}/>
                <Modal isOpen={this.state.isActive} style={customStyles} contentLabel="Example Modal" className='shadow' onRequestClose={this.closeModal} shouldCloseOnOverlayClick={true}>
                
                <ComicShow comicId = {comic.id}/>
                <br/>
                <br/>
                <br/>
                <ButtonDiv><button onClick={this.closeModal} className='marvel-btn'><FaClose size={30}/></button></ButtonDiv>

                
                </Modal>
                </ComicCard>
                }
                
        </div>
    )
  }
}
