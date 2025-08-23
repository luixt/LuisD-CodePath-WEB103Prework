import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './ViewContent.css';

const ViewContent = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('Creators')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setContent(data);
      }
    };

    fetchCreator();
  }, [id]);

  return (
    <div>
      {content ? (
        <div className="ContentDetail">
          <h2 className="ContentDetail-h2">{content.title}</h2>
          <p className="ContentDetail-p">{content.description}</p>
          <div className="center-img">
            <img className="ContentDetail-img" alt="Content Image" src={content.image} />
          </div>
          <h2>Social Media Information</h2>
          <h3>{"Youtube: " + content.youtube}</h3>
          <h3>{"Instagram: " + content.instagram}</h3>
          <h3>{"Content Creator's Info Card Likes: " + content.likes}</h3>

        </div>
      ) : (
        <p>Loading Content Creator details...</p>
      )}
    </div>
  );
};

export default ViewContent;
