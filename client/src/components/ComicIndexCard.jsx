import React from 'react';
import { Link } from 'react-router-dom';


const ComicIndexCard = (props) => {
    const comic = props.comic;
    console.log(comic)
    
    return (
        <div>
            <Link to={`/comics/${comic.id}`}>
                <img src={`${comic.thumbnail.path}.jpg`} />
            </Link>
        </div>
    );
};

export default ComicIndexCard;