import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Landing = () => {

  
  const username = localStorage.getItem('username');

  
  const [usernameFound, setUsernameFound] = useState(false); // Initialize state


  useEffect(() => {
    if (username) {
      setUsernameFound(true); // Set state if username is found
    } else {
      setUsernameFound(false); // Set state if no username
    }
  }, [usernameFound]); // Dependency array ensures it runs only when username changes


  const handleLogout = () => { 
    localStorage.removeItem('username');
    setUsernameFound(false); // Update state to hide the welcome
  }

  


  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue to-black flex flex-col justify-center items-center
     landing">
      {/* Navigation Bar */}
    
     

      {usernameFound ? (
     
          <div className="absolute top-1 right-2">

            <button
            onClick={handleLogout}
            className="text-white text-lg border-r-red-700 ">

              Logout

            </button>


           </div> 
       

      
      ):<div className="absolute top-1 right-2  ">
      <Link to="/auth" className="  bg-gradient-to-r from-green-500 to-white-600 text-white text-1xl font-bold px-3 rounded-full hover:from-indigo-600 hover:to-blue-500 transition-colors duration-300">
          signup
        </Link>
      </div>}

      {/* Content Section */}
      <div className="text-center ">
       <div>
       <h1 className="text-5xl font-bold text-white mb-4">Welcome {username} to ArtGenX</h1>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Generate stunning images from text with the best open-source API. Completely free to generate an unlimited number of images.
        </p>
       </div>

        

        {/* "Let's Artify" Button */}
       <div className='mt-10'>
       <Link to="/chat" className="mt-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold py-3 px-8 rounded-full hover:from-indigo-600 hover:to-blue-500 transition-colors duration-300">
          Let's Artify
        </Link>
       </div>
      </div>


      <div className='w-80 mt-7' >
        <img
            src = "../public/photo-collage.png.png"

        />
      </div>

    </div>
  );
};

export default Landing;
