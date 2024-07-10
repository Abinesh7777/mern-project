// src/components/DeleteAuction.js

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteAuction = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteAuction = async () => {
      try {
        await axios.delete(`http://localhost:5000/api/auctions/${id}`);
        navigate('/auctions');
      } catch (err) {
        console.error('Auction deletion failed', err);
      }
    };

    deleteAuction();
  }, [id, navigate]);

  return <div>Deleting auction...</div>;
};

export default DeleteAuction;
