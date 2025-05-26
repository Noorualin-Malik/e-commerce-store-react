import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Favourites.css';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('favorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const handleRemoveFavorite = (productId) => {
    const updatedFavorites = favorites.filter((item) => item._id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="logo">I-Shop</div>
        <nav className="nav-menu">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/cart')}>Cart</button>
          <button onClick={() => navigate('/favorites')}>Favorites</button>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        </nav>
      </header>

      <main className="content">
        <h2 className="section-title">My Favorites</h2>
        {favorites.length === 0 ? (
          <p>You have no favorite products yet.</p>
        ) : (
          <div className="products-grid">
            {favorites.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  className="product-image"
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.product_name}
                />
                <div className="product-info">
                  <h3>{product.product_name}</h3>
                  <p>${product.price}</p>
                  <button
                    className="remove-fav-btn"
                    onClick={() => handleRemoveFavorite(product._id)}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">I-Shop ©2025 Created by You</footer>
    </div>
  );
};

export default FavoritesPage;
