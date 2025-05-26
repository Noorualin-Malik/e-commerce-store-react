import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Reviews from './Reviews';
import FAQ from './FAQ';
import Qualities from './Qualities';
import FeaturedProducts from './FeaturedProducts';



const HomePage = () => {
  
  const featuredRef= useRef(null);
   const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('favorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/products',
          {
          headers: { Authorization: `Bearer ${token}` },
}
);
        if (!res.ok) throw console.log('Failed to fetch product');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    let updatedCart;
    if (exists) {
      updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.product_name} added to cart!`);
  };

  const handleToggleFavorite = (product) => {
    const isFavorite = favorites.some((item) => item._id === product._id);
    let updatedFavorites;
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter((item) => item._id !== product._id);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, product];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Helper to check if product is favorite
  const isFavorite = (productId) => favorites.some((item) => item._id === productId);

  return (
    <>
    <div className="layout">
      {/* Navbar */}
      <header className="header">
        <div className="logo">I-Shop</div>
        <nav className="nav-menu">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/favorites')}>Favorites</button>
          <button onClick={() => navigate('/cart')}>Cart</button>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Signup</button>


        </nav>
      </header>

      {/* Content */}
      <main className="content">
        <section className="hero-section">
          <h1>Welcome to I-Shop</h1>
          <p>Discover the latest trending products today</p>
          <button className="shop-now-btn" onClick={() => scrollToSection(featuredRef)}>
            Shop Now
          </button>
        </section>
<FeaturedProducts/>
<div className="image">
<img src="https://i.pinimg.com/736x/00/4e/ee/004eee842dc076d053d9a5764589050e.jpg" /></div>
        <h2 className="section-title" ref={featuredRef} style={{color:"white", backgroundColor:"#333", display:"flex", alignItems:"center", justifyContent:"center"}}>Featured Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                className="product-image"
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.product_name}
              />
              <div className="product-info">
                <h3>{product.product_name}</h3>
                <h4>{product.description}</h4> <br />
                <p>Price: ${product.price}</p>
                <p>⭐⭐⭐⭐⭐</p>
                <div className="buttons-row">
                  <button
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className={`fav-btn ${isFavorite(product._id) ? 'fav-active' : ''}`}
                    onClick={() => handleToggleFavorite(product)}
                    title={isFavorite(product._id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorite(product._id) ? '★' : '☆'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
 <Reviews/>
 <div className="image" >
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf5dfdC557XzF2LwhB5btjqKvta7rF03-gqLKL2vNmrcAaIz0YidCsI7GLnO8jrQJunNA&usqp=CAU" alt=""/>
 </div>
 
 <Qualities/>
 <FAQ/>
      {/* Footer */}
      <footer className="footer">I-Shop ©2025 Created by You</footer>
    </div>

</>
  );
};

export default HomePage;
