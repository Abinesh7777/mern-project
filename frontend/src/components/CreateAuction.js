import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAuction = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    currentBid: 0,
    endDate: '',
    image: null,
  });
  const [error, setError] = useState(null);

  const { title, description, currentBid, endDate, image } = formData;

  const onChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formDataObj = new FormData();
    formDataObj.append('title', title);
    formDataObj.append('description', description);
    formDataObj.append('currentBid', currentBid);
    formDataObj.append('endDate', endDate);
    formDataObj.append('creatorId', user._id);
    if (image) formDataObj.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/auctions', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/auctions');
    } catch (err) {
      console.error('Creating auction failed', err);
      setError('Creating auction failed');
    }
  };

  return (
    <div style={{
      backgroundImage: 'url("/bid2.jpg")',
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
        }}>Create Auction</h1>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={onSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={onChange}
            required
            style={{
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          <textarea
            placeholder="Description"
            name="description"
            value={description}
            onChange={onChange}
            required
            style={{
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              height: '100px'
            }}
          />
          <input
            type="number"
            placeholder="Current Bid"
            name="currentBid"
            value={currentBid}
            onChange={onChange}
            required
            style={{
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          <input
            type="date"
            placeholder="End Date"
            name="endDate"
            value={endDate}
            onChange={onChange}
            required
            style={{
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          <input
            type="file"
            name="image"
            onChange={onChange}
            style={{
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
          <input
            type="submit"
            value="Create Auction"
            style={{
              padding: '15px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#28a745',
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;
