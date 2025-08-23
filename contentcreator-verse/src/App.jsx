import './App.css';
import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom'
import CreatorList from './pages/CreatorList'
import CreateContent from './pages/CreateContent'
import EditContent from './pages/EditContent'
import ViewContent from './pages/ViewContent'
import { Link } from 'react-router-dom'


const App = () => {
  
  const comments = [
    
  ]
 
  const [searchQuery, setSearchQuery] = useState(''); // State to track search input


  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<CreatorList searchQuery={searchQuery} />
    },
    {
      path:"/edit/:id",
      element: <EditContent data={comments} />
    },
    {
      path:"/comments/:id",
      element: <ViewContent />
    },
    {
      path:"/new",
      element: <CreateContent />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>Content Creator Verse</h1>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery
          className="search-bar"
        />
        <div className='link-group'>
        <Link to="/"><button className="headerBtn"> Home  </button></Link>
        <Link to="/new"><button className="headerBtn"> Create New Content</button></Link>
        </div>
      </div>
      <br></br>
        {element}
    </div>

  );
}

export default App;
