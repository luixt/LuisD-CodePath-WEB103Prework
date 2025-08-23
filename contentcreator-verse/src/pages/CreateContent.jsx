import React, { useState } from 'react';
import './CreateContent.css';
import { supabase } from '../client';


const CreateContent = () => {

    const createCreator = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Creators')
          .insert({title: content.title, description: content.description, image: content.image, youtube: content.youtube, instagram: content.instagram, likes: content.likes})
          .select();
      
        window.location = "/";
    }

    const [content, setContent] = useState({title: "", description: "", image: "", youtube:"", instagram: "", likes: 0});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setContent( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }


    return (
        <div>
            <form>
                <label >Title</label>
                <input className="text-box-short" type="text" id="title" name="title" value={content.title} onChange={handleChange} /><br />
                <br/>

                <label>Description</label>
                <textarea 
                    className="text-box-big" 
                    id="description" 
                    name="description" 
                    value={content.description} 
                    onChange={handleChange} 
                    rows="5"
                /><br />
                <br />

                <label >Image</label>
                <input className="text-box-short" type="text" id="image" name="image" value={content.image} onChange={handleChange} /><br />
                <br/>

                <h2>Social Media Links</h2>

                <label >Youtube</label>
                <input className="text-box-short" type="text" id="youtube" name="youtube" value={content.youtube} onChange={handleChange} /><br />
                <br/>

                <label >Instagram</label>
                <input className="text-box-short" type="text" id="instagram" name="instagram" value={content.instagram} onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Post" onClick={createCreator} />
            </form>
        </div>
    )
}

export default CreateContent;