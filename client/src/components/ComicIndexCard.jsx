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
    
    return (
        <div>
            <Link to={`/comics/${comic.id}`}>
                {comic.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'?
                <ComicCard> <img src={`https://i.imgur.com/yLppAf3.png`} /> </ComicCard>
                :
                <ComicCard> <img src={`${comic.thumbnail.path}.jpg`} /> </ComicCard>
                }
                
                
            </Link>
        </div>
    );
};

export default ComicIndexCard;