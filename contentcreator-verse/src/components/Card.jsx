import React, { useState } from 'react';
import './Card.css';
import more from './more.png';
import youtube from './youtube.png';
import instagram from './instagram.png';
import { Link } from 'react-router-dom';
import { supabase } from '../client.jsx'; 
import { formatDistanceToNow, parseISO } from 'date-fns';

const Card = (props) => {
  const [likes, setLikes] = useState(props.likes); 

  
  const handleLike = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes); 

    
    const { error } = await supabase
      .from('Creators') 
      .update({ likes: newLikes })
      .eq('id', props.id); 

    if (error) {
      console.error('Error updating likes:', error.message);
      
      setLikes(likes);
    }
  };

  const timeAgo = formatDistanceToNow(parseISO(props.time), { addSuffix: true });

  return (
    <div className="Card">
      <Link to={'/edit/' + props.id}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
        <a 
        href={`https://www.youtube.com/@${props.youtube}`} 
        target="_blank" 
        rel="noopener noreferrer"
        >
        <img className="socialmediaButton" alt="youtube button" src={youtube} />
        </a>

        <a 
        href={`https://www.instagram.com/${props.instagram}`} 
        target="_blank" 
        rel="noopener noreferrer"
        >
        <img className="socialmediaButton" alt="instagram button" src={instagram} />
        </a>
        
      <p className="time">{"created " + timeAgo}</p>
      <Link to={'/creators/' + props.id} className="card-link">
        <h2>{props.title}</h2>
      </Link>
      <p>{props.description}</p>
      <br />
      <div className="likes">
        <img
          className="heart"
          alt="like button"
          src="/heart.png"
          onClick={handleLike} 
          style={{ cursor: 'pointer' }} 
        />
        <br /><br /><br />
        <h3 className='likes-text'>{likes}</h3>
      </div>
    </div>
  );
};

export default Card;
