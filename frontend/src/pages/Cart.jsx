import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components (unchanged)
const CartContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 200;
  color: #665A38;
  margin-bottom: 2rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1.5rem;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const ItemVariant = styled.div`
  font-size: 1rem;
  color: #666;
`;

const ItemPrice = styled.div`
  font-weight: bold;
  color: #665A38;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  background: #ccc;
  border: none;
  padding: 0.4rem 0.8rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const QuantityValue = styled.span`
  font-size: 1rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 1rem;
`;

const TotalContainer = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: right;
  color: #333;
`;

const CheckoutButton = styled.button`
  margin-top: 2rem;
  width: 100%;
  background: #665A38;
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: #7d6c43;
  }
`;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const navigate = useNavigate();

  // Load cart from localStorage
  const loadCart = () => {
    try {
      const storedCart = localStorage.getItem('cart');
      console.log('Raw localStorage cart:', storedCart); // Debugging
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          // Normalize and filter valid items
          const normalizedCart = parsedCart
              .filter(item => item && item.id != null && item.name && item.price != null)
              .map(item => ({
                ...item,
                id: Number(item.id), // Normalize ID to number
                price: parseFloat(item.price || 0),
                quantity: Number(item.quantity || 1)
              }));
          setCart(normalizedCart);
          console.log('Loaded cart:', normalizedCart); // Debugging
        } else {
          console.warn('Cart is not an array, resetting to empty');
          setCart([]);
        }
      } else {
        setCart([]);
        console.log('No cart in localStorage');
      }
      setIsCartLoaded(true);
    } catch (err) {
      console.error('Error loading cart:', err);
      setCart([]);
      setIsCartLoaded(true);
    }
  };

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (!isCartLoaded) return; // Skip until cart is loaded
    try {
      console.log('Saving cart to localStorage:', cart); // Debugging
      if (cart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        localStorage.removeItem('cart');
      }
    } catch (err) {
      console.error('Error saving cart:', err);
    }
  }, [cart, isCartLoaded]);

  const updateQuantity = (index, delta) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      const newQty = newCart[index].quantity + delta;
      if (newQty < 1) return newCart; // Prevent quantity < 1
      newCart[index].quantity = newQty;
      return newCart;
    });
  };

  const removeItem = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart, total: getTotal() } });
  };

  // Infer item type based on name
  const getItemVariantLabel = (item) => {
    if (item.flavor) return `Flavor: ${item.flavor}`;
    if (item.size) return `Size: ${item.size}`;
    const name = item.name.toLowerCase();
    if (name.includes('brownie')) return 'Type: Brownie';
    if (name.includes('cookie')) return 'Type: Cookie';
    if (name.includes('muffin')) return 'Type: Muffin';
    return 'Type: Item';
  };

  return (
      <CartContainer>
        <Title>Your Cart</Title>
        {cart.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <>
              {cart.map((item, index) => (
                  <CartItem key={`${item.id}-${index}`}>
                    <ItemImage src={item.image || '/placeholder.svg'} alt={item.name} />
                    <ItemDetails>
                      <ItemName>{item.name || 'Unknown Product'}</ItemName>
                      <ItemVariant>{getItemVariantLabel(item)}</ItemVariant>
                      <ItemPrice>Rs. {(item.price || 0).toFixed(2)}</ItemPrice>
                      <QuantityControls>
                        <QuantityButton
                            onClick={() => updateQuantity(index, -1)}
                            disabled={item.quantity <= 1}
                        >
                          -
                        </QuantityButton>
                        <QuantityValue>{item.quantity}</QuantityValue>
                        <QuantityButton onClick={() => updateQuantity(index, 1)}>
                          +
                        </QuantityButton>
                        <RemoveButton onClick={() => removeItem(index)}>Remove</RemoveButton>
                      </QuantityControls>
                    </ItemDetails>
                  </CartItem>
              ))}
              <TotalContainer>Total: Rs. {getTotal()}</TotalContainer>
              <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
            </>
        )}
      </CartContainer>
  );
};

export default Cart;