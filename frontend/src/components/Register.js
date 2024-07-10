import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post('https://mern-project-3-fjd3.onrender.com/api/users/register', { name, email, password });
      console.log(res.data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{
        backgroundImage: 'url("regg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <div style={{
        maxWidth: '400px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>Register</h1>
        {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '1.2rem' }}>{error}</p>}
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
            style={{ 
              padding: '10px', 
              borderRadius: '5px', 
              border: '1px solid #ccc', 
              fontSize: '1rem' 
            }}
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
            style={{ 
              padding: '10px', 
              borderRadius: '5px', 
              border: '1px solid #ccc', 
              fontSize: '1rem' 
            }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
            style={{ 
              padding: '10px', 
              borderRadius: '5px', 
              border: '1px solid #ccc', 
              fontSize: '1rem' 
            }}
          />
          <input
            type="submit"
            value="Register"
            style={{ 
              padding: '10px', 
              borderRadius: '5px', 
              border: 'none', 
              backgroundColor: '#28a745', 
              color: '#fff', 
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          />
        </form>
        <p style={{ textAlign: 'center', fontSize: '1rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#007bff', textDecoration: 'underline' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
