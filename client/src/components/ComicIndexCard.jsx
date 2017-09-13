import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ComicCard = styled.div`

img {
    width: 200px;
    height: 304px;
    margin: 10px;
}
`

const ComicIndexCard = (props) => {
    const comic = props.comic;
    console.log(comic)
    
    return (
        <div>
            <Link to={`/comics/${comic.id}`}>
            
                <ComicCard> <img src={`${comic.thumbnail.path}.jpg`} /> </ComicCard>
                
            </Link>
        </div>
    );
};

export default ComicIndexCard;