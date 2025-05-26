import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Item removed from cart');
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '10px 18px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    backgroundColor: '#2d2d2d',
    padding: '10px 0',
    borderRadius: '6px',
    marginBottom: '20px',
  };

  const disabledButtonStyle = {
    ...navButtonStyle,
    color: '#888',
    cursor: 'not-allowed',
    background: 'none',
  };

  const tableStyle = {
    width: '97%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 7px rgba(0,0,0,0.1)',
    margin: '20px'
  };

  const thTdStyle = {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    fontSize: '14px',
    color: '#333',
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: '#00bcd4',
    color: 'white',
    fontWeight: '600',
    fontSize: '15px',
  };

  const removeBtnStyle = {
    backgroundColor: '#ff6b6b',
    border: 'none',
    color: 'white',
    padding: '7px 14px',
    fontSize: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const removeBtnHover = (e) => {
    e.target.style.backgroundColor = '#e85a5a';
  };

  const removeBtnUnhover = (e) => {
    e.target.style.backgroundColor = '#ff6b6b';
  };

  const totalPriceStyle = {
    textAlign: 'right',
    fontSize: '1.2rem',
    margin: '20px',
    color: '#222',
  };

  const checkoutBtnStyle = {
    backgroundColor: '#00bcd4',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '5px',
    float: 'right',
    transition: 'background-color 0.3s ease',
    margin: '20px',
  };

  const checkoutBtnHover = (e) => {
    e.target.style.backgroundColor = '#0097a7';
  };

  const checkoutBtnUnhover = (e) => {
    e.target.style.backgroundColor = '#00bcd4';
  };

  return (
    <>
    <header className="header">
        <div className="logo">I-Shop</div>
        <nav className="nav-menu">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/cart')}>Cart</button>
          <button onClick={() => navigate('/favorites')}>Favorites</button>
          
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        </nav>
      </header>

      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p style={{textAlign: 'center'}}>Your cart is empty.</p>
      ) : (
        <>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td style={thTdStyle}>{item.product_name}</td>
                  <td style={thTdStyle}>${item.price.toFixed(2)}</td>
                  <td style={thTdStyle}>{item.quantity}</td>
                  <td style={thTdStyle}>${(item.price * item.quantity).toFixed(2)}</td>
                  <td style={thTdStyle}>
                    <button
                      style={removeBtnStyle}
                      onClick={() => removeFromCart(item._id)}
                      onMouseEnter={removeBtnHover}
                      onMouseLeave={removeBtnUnhover}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={totalPriceStyle}>
            Total Price: <strong>${totalPrice.toFixed(2)}</strong>
          </h3>

          <div>
            <button
              style={checkoutBtnStyle}
              onClick={() => alert('Checkout feature coming soon!')}
              onMouseEnter={checkoutBtnHover}
              onMouseLeave={checkoutBtnUnhover}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
