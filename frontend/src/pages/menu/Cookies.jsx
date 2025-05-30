import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import API_BASE_URL from "../../config.jsx";

// Styled Components (unchanged)
const PageContainer = styled.div`
  margin: 0 auto;
  padding: 80px 150px;
  color: #000;
  background: #fff;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 2rem;
  font-size: 1rem;
  &:hover {
    color: #ccc;
  }
`;

const CategoryTitle = styled.h1`
  font-family: 'Inter', serif;
  font-size: 60px;
  font-weight: 200;
  color: #665A38;
  margin: 0 0 2rem 0;
  text-align: center;
`;

const CookiesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-content: center;
  width: 100%;
`;

const CookieCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CookieImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CookieInfo = styled.div`
  padding: 1.5rem;
`;

const CookieName = styled.h3`
  font-size: 1.5rem;
  color: #665A38;
  margin: 0 0 0.5rem 0;
`;

const CookieDescription = styled.p`
  color: #000;
  margin: 0 0 1rem 0;
  line-height: 1.6;
`;

const CookiePrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #665A38;
  margin-bottom: 1rem;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const QuantityLabel = styled.p`
  font-weight: bold;
  margin: 0;
  color: #000;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #444;
  border-radius: 4px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  background-color: #ccc;
  border: none;
  color: #555;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #ddd;
  }
  &:disabled {
    color: #555;
    cursor: not-allowed;
  }
`;

const QuantityValue = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #000;
`;

const TotalPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #665A38;
  margin-bottom: 1rem;
`;

const AddToCartButton = styled.button`
  background-color: #665A38;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
  &:hover {
    background-color: #A79D75;
  }
  &:disabled {
    background-color: #A79D75;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  text-align: center;
  font-size: 1.2rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #665A38;
`;

const Cookies = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/other/all`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter cookies by productName
  const cookies = products.filter(product => product.productName.includes("Cookie"));

  useEffect(() => {
    if (products.length > 0 && Object.keys(quantities).length === 0) {
      const initialQuantities = products.reduce((acc, product) => {
        if (product.productName.includes("Cookie")) {
          acc[product.productId] = 1;
        }
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [products]);

  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };

  // Handle quantity change
  const handleQuantityChange = (cookieId, newQuantity) => {
    setQuantities(prev => ({
      ...prev,
      [cookieId]: Math.max(1, newQuantity)
    }));
  };

  // Calculate total price for a cookie
  const calculateTotalPrice = (cookie, quantity) => {
    return (parseFloat(cookie.productUnitPrice) * quantity).toFixed(2);
  };

  // Handle add to cart
  const handleAddToCart = (cookie, quantity) => {
    const cartItem = {
      id: cookie.productId,
      name: cookie.productName,
      price: parseFloat(calculateTotalPrice(cookie, quantity)),
      quantity,
      image: cookie.productImage || '/placeholder.svg'
    };

    try {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (!Array.isArray(cart)) cart = [];

      const existingItemIndex = cart.findIndex(
          item => item.id === cartItem.id
      );

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += cartItem.quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Cart updated:', cart); // Debugging
      alert(`Added ${cartItem.quantity} ${cartItem.name} to cart!`);
    } catch (err) {
      console.error('Error saving to localStorage:', err);
      alert('Failed to add item to cart.');
    }
  };

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (cookies.length === 0) return <ErrorMessage>No cookies found</ErrorMessage>;

  return (
      <PageContainer>
        <BackButton onClick={handleBack}>← Back to categories</BackButton>
        <CategoryTitle>Cookies</CategoryTitle>
        <CookiesContainer>
          {cookies.map(cookie => {
            const quantity = quantities[cookie.productId] || 1;
            return (
                <CookieCard key={cookie.productId}>
                  <CookieImage src={cookie.productImage} alt={cookie.productName} />
                  <CookieInfo>
                    <CookieName>{cookie.productName}</CookieName>
                    <CookieDescription>
                      A delicious {cookie.productName.toLowerCase()} with a perfect texture.
                    </CookieDescription>
                    <CookiePrice>Rs. {parseFloat(cookie.productUnitPrice).toFixed(2)}</CookiePrice>
                    <QuantitySelector>
                      <QuantityLabel>Quantity:</QuantityLabel>
                      <QuantityControls>
                        <QuantityButton
                            onClick={() => handleQuantityChange(cookie.productId, quantity - 1)}
                            disabled={quantity <= 1}
                        >
                          -
                        </QuantityButton>
                        <QuantityValue>{quantity}</QuantityValue>
                        <QuantityButton
                            onClick={() => handleQuantityChange(cookie.productId, quantity + 1)}
                        >
                          +
                        </QuantityButton>
                      </QuantityControls>
                    </QuantitySelector>
                    <TotalPrice>Total: Rs. {calculateTotalPrice(cookie, quantity)}</TotalPrice>
                    <AddToCartButton onClick={() => handleAddToCart(cookie, quantity)}>
                      Add to Cart
                    </AddToCartButton>
                  </CookieInfo>
                </CookieCard>
            );
          })}
        </CookiesContainer>
      </PageContainer>
  );
};

export default Cookies;