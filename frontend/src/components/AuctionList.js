import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AuctionList = ({ user }) => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await axios.get('https://mern-project-3-fjd3.onrender.com/api/auctions');
        setAuctions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAuctions();
  }, []);

  const placeBid = async (auctionId, newBid) => {
    try {
      await axios.put(`https://mern-project-3-fjd3.onrender.com/api/auctions/bid/${auctionId}`, { currentBid: newBid });
      setAuctions(auctions.map(auction => auction._id === auctionId ? { ...auction, currentBid: newBid } : auction));
    } catch (err) {
      console.error('Placing bid failed', err);
    }
  };

  const deleteAuction = async (auctionId) => {
    try {
      await axios.delete(`https://mern-project-3-fjd3.onrender.com/api/auctions/${auctionId}`);
      setAuctions(auctions.filter(auction => auction._id !== auctionId));
    } catch (err) {
      console.error('Auction deletion failed', err);
    }
  };

  return (
    <div style={{
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <h1 style={{
          fontSize: '3rem',
          color: '#333',
          marginBottom: '20px'
        }}>All Auctions</h1>
      <ul style={{
          listStyleType: 'none',
          padding: '0',
          maxWidth: '900px',
          width: '100%'
        }}>
        {auctions.map((auction) => (
          <li key={auction._id} style={{
              backgroundColor: '#fff',
              padding: '20px',
              marginBottom: '15px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
            {auction.imageUrl && <img src={`https://mern-project-3-fjd3.onrender.com/${auction.imageUrl}`} alt={auction.title} style={{ width: '100px', height: '100px', borderRadius: '5px' }} />}
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '1.5rem' }}>{auction.title}</strong>
              <p style={{ fontSize: '1rem', margin: '10px 0' }}>{auction.description}</p>
              <p style={{ fontSize: '1.2rem', margin: '10px 0' }}>Current Bid: ${auction.currentBid}</p>
              <p style={{ fontSize: '1rem', margin: '10px 0' }}>End Date: {new Date(auction.endDate).toLocaleDateString()}</p>
            </div>
            {user && auction.creator && auction.creator._id === user._id ? (
              <>
                <Link to={`/edit-auction/${auction._id}`} style={{
                    display: 'block',
                    marginBottom: '10px',
                    textDecoration: 'none',
                    color: '#007bff',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    transition: 'color 0.3s'
                  }}>
                  Edit
                </Link>
                <button onClick={() => deleteAuction(auction._id)} style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s'
                  }}>
                  Delete
                </button>
              </>
            ) : (
              <>
                <button onClick={() => placeBid(auction._id, auction.currentBid + 1)} style={{
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s'
                  }}>
                  Place Bid
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionList;
