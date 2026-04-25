import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {

    // change here
    const API = process.env.REACT_APP_API_URL
    axios.get(`${API}/api/products`)
    // done

      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }, [])

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const exists = cart.find(item => item._id === product._id)
    if (exists) {
      exists.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to the cart')
  }

  const categories = ['All', ...new Set(products.map(p => p.category))]

  const filtered = products
    .filter(p => category === 'All' || p.category === category)
    .filter(p => p.name && p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="products-container">
      <h2>Products</h2>
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="category-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="products-grid">
        {filtered.map(product => (
          <div key={product._id} className="product-card">
            
            {/* product image here */}
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                onError={(e) => e.target.src = '/images/mouse.jpg'}
              />
           
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">₹{product.price}</p>
            <p>Stock: {product.stock}</p>
            <button className="btn-cart" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <button className="btn-view" onClick={() => navigate('/cart')}>
              View Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home