// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateAuction from './components/CreateAuction';
import EditAuction from './components/EditAuction';
import DeleteAuction from './components/DeleteAuction';
import AuctionList from './components/AuctionList';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-auction" element={<CreateAuction user={user} />} />
          <Route path="/edit-auction/:id" element={<EditAuction user={user} />} />
          <Route path="/delete-auction/:id" element={<DeleteAuction />} />
          <Route path="/auctions" element={<AuctionList user={user} />} />
          <Route path="/" element={<Login setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

