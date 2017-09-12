import React from 'react';

const ComicIndexCard = (props) => {
    const comic = props.comic;
    console.log(comic)
    
    return (
        <div>
            <img src={`${comic.thumbnail.path}.jpg`} />
        </div>
    );
};

export default ComicIndexCard;