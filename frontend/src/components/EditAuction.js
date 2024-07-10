import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditAuction = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentBid, setCurrentBid] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auction/${id}`);
        const auction = res.data;
        setTitle(auction.title);
        setDescription(auction.description);
        setCurrentBid(auction.currentBid);
        setEndDate(auction.endDate.split('T')[0]);
        setImageUrl(auction.imageUrl);
      } catch (err) {
        console.error('Fetching auction failed', err);
      }
    };

    fetchAuction();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('currentBid', currentBid);
    formData.append('endDate', endDate);
    formData.append('image', image);
    formData.append('imageUrl', imageUrl);

    try {
      await axios.put(`http://localhost:5000/api/auctions/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/auctions');
    } catch (err) {
      console.error('Updating auction failed', err);
    }
  };

  return (
    <div style={{
      backgroundImage: 'url("/ed2.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '600px'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          color: '#333',
          marginBottom: '20px'
        }}>Edit Auction</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '1.2rem', marginBottom: '5px' }}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '100%'
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '1.2rem', marginBottom: '5px' }}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                height: '100px',
                width: '100%'
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '1.2rem', marginBottom: '5px' }}>Current Bid</label>
            <input
              type="number"
              value={currentBid}
              onChange={(e) => setCurrentBid(e.target.value)}
              required
              style={{
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '100%'
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '1.2rem', marginBottom: '5px' }}>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              style={{
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '100%'
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '1.2rem', marginBottom: '5px' }}>Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={{
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '100%'
              }}
            />
            {imageUrl && (
              <img
                src={`http://localhost:5000/${imageUrl}`}
                alt={title}
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            )}
          </div>
          <button
            type="submit"
            style={{
              padding: '15px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#007bff',
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            Update Auction
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAuction;
