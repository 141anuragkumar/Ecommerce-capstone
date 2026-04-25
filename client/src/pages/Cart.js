import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || []
    setCart(cartData)
  }, [])

  const removeFromCart = (id) => {
    const updated = cart.filter(item => item._id !== id)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const updateQuantity = (id, change) => {
    const updated = cart.map(item => {
      if (item._id === id) {
        const newQty = item.quantity + change
        if (newQty < 1) return null
        return { ...item, quantity: newQty }
      }
      return item
    }).filter(Boolean)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const handlePlaceOrder = () => {
    // Check karo user logged in hai ya nahi
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first to place an order')
      navigate('/login')
      return
    }
    // User logged in hai toh order place karo
    alert('Order placed successfully')
    setCart([])
    localStorage.removeItem('cart')
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>The cart is empty</p>
          <button onClick={() => navigate('/')}>See products</button>
        </div>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <div>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Subtotal: ₹{item.price * item.quantity}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button className="qty-btn" onClick={() => updateQuantity(item._id, -1)}>−</button>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{item.quantity}</span>
                <button className="qty-btn" onClick={() => updateQuantity(item._id, 1)}>+</button>
                <button className="btn-remove" onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ₹{total}</h3>
            <button className="btn-order" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart