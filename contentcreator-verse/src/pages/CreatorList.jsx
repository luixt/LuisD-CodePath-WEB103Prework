import React, { useState, useEffect } from 'react';
import Card from '../components/Card.jsx';
import { supabase } from '../client.jsx';
import './CreatorList.css';


const CreatorList = ({ searchQuery }) => {
  const [creators, setCreators] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  
  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase
        .from('Creators')
        .select()
        .order('created_at',  { ascending: sortOrder === 'oldest' });

      setCreators(data);
    };

    fetchCreator();
  }, [sortOrder]);
  
    
  const filteredCreators = creators.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
      
  const handleNewestClick = () => {
    setSortOrder('newest');
  };

  
  const handleMostPopularClick = () => {
    setSortOrder('popular');
  };

 
  const sortedCreators = sortOrder === 'popular'
    ? [...filteredCreators].sort((a, b) => b.likes - a.likes)
    : filteredCreators;

  return (
    <div>
      <div className='filter'>
          <h3>Order By: </h3>
          <button className="bttn-filter" onClick={handleNewestClick}>Newest</button>
          <button className="bttn-filter" onClick={handleMostPopularClick}>Most Popular</button>
      </div>
      {sortedCreators && sortedCreators.length > 0 ? (
        sortedCreators.map((post) => (
          <Card
            key={post.id}
            id={post.id}
            time={post.created_at}
            title={post.title}
            description={post.description}
            image={post.image}
            youtube={post.youtube}
            instagram={post.instagram}
            likes={post.likes}
          />
        ))
      ) : (
        <h2>No Posts Found 😞</h2>
      )}
    </div>
  );
};

export default CreatorList;