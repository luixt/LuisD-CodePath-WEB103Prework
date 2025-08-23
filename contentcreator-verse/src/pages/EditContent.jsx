import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './EditContent.css';
import { supabase } from '../client';


const EditContent = ({data}) => {

    const {id} = useParams();
    const [content, setContent] = useState({id: null, title: "", description: "", image: "", youtube: "", instagram: "", likes: 0});

    useEffect(() => {
        const fetchCreator = async () => {
          const { data, error } = await supabase
            .from('Creators')
            .select()
            .eq('id', id)  // Query for the specific crewmate by ID
            .single();  // Fetch one crewmate
    
          if (error) {
            console.error('Error fetching posts:', error);
          } else {
            setContent(data);
          }
        };
    
        fetchCreator();
      }, [id]);

    const deleteCreator = async (event) => {
        event.preventDefault();
    
        // Delete the Creator itself
        const { error: deleteCreatorError } = await supabase
            .from('Creators')
            .delete()
            .eq('id', id);
    
        if (deleteCreatorError) {
            console.error('Error deleting Creator:', deleteCreatorError);
            return;
        }
    
        // Redirect to home page after successful deletion
        window.location = "/";
    };

    const updateCreator = async (event) => {
        event.preventDefault();

        await supabase
            .from('Creators')
            .update({ title: content.title, description: content.description, image: content.image, youtube: content.youtube, instagram: content.instagram})
            .eq('id', id);

        window.location = "/";
    }

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

                <input type="submit" value="Update" onClick={updateCreator}/>
                <button className="deleteButton" onClick={deleteCreator}>Delete</button>
            </form>
        </div>
    )
}

export default EditContent;