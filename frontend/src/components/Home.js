import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={{
        backgroundImage: 'url("ho1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center'
      }}>
      <h1 style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          color: 'red',
          marginBottom: '20px'
        }}>AUCTION!!</h1>
      <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '40px'
        }}>Welcome to Auction, {user ? user.name : 'Guest'}</h2>
      <nav style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
        <ul style={{
            listStyleType: 'none',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
          <li style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '30px',
              borderRadius: '10px',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              width: '300px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s, transform 0.3s',
              cursor: 'pointer'
            }}>
            <Link to="/create-auction" style={{
                color: '#fff',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.3s',
                padding: '10px',
                fontSize: '2rem',
              }}>
              Create Auction
            </Link>
          </li>
          <li style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '30px',
              borderRadius: '10px',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              width: '300px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s, transform 0.3s',
              cursor: 'pointer'
            }}>
            <Link to="/auctions" style={{
                color: '#fff',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.3s',
                padding: '10px',
                fontSize: '2rem',
              }}>
              View All Auctions
            </Link>
          </li>
          <li style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '30px',
              borderRadius: '10px',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              width: '300px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s, transform 0.3s',
              cursor: 'pointer'
            }}>
            <Link to="/" onClick={handleLogout} style={{
                color: '#fff',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.3s',
                padding: '10px',
                fontSize: '2rem',
              }}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
