import React from 'react';

const UserComicCard = (props) => {
    
    return (
        <div>
            <img src={props.comic.thumbnail}/>
        </div>
    );
};

export default UserComicCard;