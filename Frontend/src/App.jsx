import { useState } from 'react';
import './App.css';
import ImageGenerator from './ImageGenerator.jsx';
import Auth from './auth.jsx';
import Landing from './Landing.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx'; // Import AuthProvider

function App() {
  return (
    <Router> {/* Place Router first */}
      <AuthProvider> {/* Wrap AuthProvider inside Router */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/chat" element={<ImageGenerator />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
