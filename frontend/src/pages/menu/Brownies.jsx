import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import API_BASE_URL from "../../config.jsx";

// Styled Components
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

const BrownieCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  max-width: 800px;
  width: 100%;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const BrownieImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const BrownieInfo = styled.div`
  padding: 1.5rem;
`;

const BrownieName = styled.h3`
  font-size: 1.5rem;
  color: #665A38;
  margin: 0 0 0.5rem 0;
`;

const BrownieDescription = styled.p`
  color: #000;
  margin: 0 0 1rem 0;
  line-height: 1.6;
`;

const BrowniePrice = styled.div`
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

const BrownieFeatures = styled.div`
  margin-top: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: #665A38;
  margin-bottom: 0.5rem;
`;

const FeatureList = styled.ul`
  padding-left: 1.5rem;
  color: #000;
  li {
    margin-bottom: 0.5rem;
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

const Brownies = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/other/all`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        // Normalize productUnitPrice and productId to numbers
        const normalizedData = data.map(product => ({
          ...product,
          productId: Number(product.productId),
          productUnitPrice: parseFloat(product.productUnitPrice)
        }));
        setProducts(normalizedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const brownie = products.find(product => product.productName === "Fudgy Chocolate Brownie") || {};

  const features = [
    "Made with premium Belgian chocolate",
    "No artificial preservatives",
    "Baked fresh daily",
    "Available for same-day delivery"
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const calculateTotalPrice = () => {
    return (parseFloat(brownie.productUnitPrice || 0) * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: Number(brownie.productId), // Ensure ID is a number
      name: brownie.productName || 'Unknown Product',
      price: parseFloat(brownie.productUnitPrice || 0),
      quantity: Number(quantity), // Ensure quantity is a number
      image: brownie.productImage || '/placeholder.svg'
    };

    try {
      // Read existing cart
      let cart = [];
      const storedCart = localStorage.getItem('cart');
      console.log('Raw localStorage cart:', storedCart); // Debugging
      if (storedCart) {
        cart = JSON.parse(storedCart);
        if (!Array.isArray(cart)) {
          console.warn('Cart is not an array, resetting to empty');
          cart = [];
        } else {
          // Normalize existing cart items
          cart = cart
              .filter(item => item && item.id != null && item.name && item.price != null) // Remove invalid items
              .map(item => ({
                ...item,
                id: Number(item.id), // Normalize ID to number
                price: parseFloat(item.price || 0),
                quantity: Number(item.quantity || 1)
              }));
        }
      }
      console.log('Normalized cart before adding:', cart); // Debugging

      // Check for existing item
      const existingItemIndex = cart.findIndex(item => Number(item.id) === Number(cartItem.id));

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += cartItem.quantity;
      } else {
        cart.push(cartItem);
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Saved cart to localStorage:', cart); // Debugging
      alert(`Added ${cartItem.quantity} ${cartItem.name} to cart!`);
      navigate('/cart'); // Navigate to cart (remove if not desired)
    } catch (err) {
      console.error('Error in handleAddToCart:', err);
      alert('Failed to add item to cart.');
    }
  };

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!brownie.productId) return <ErrorMessage>No brownie found</ErrorMessage>;

  return (
      <PageContainer>
        <BackButton onClick={handleBack}>← Back to categories</BackButton>
        <CategoryTitle>Brownies</CategoryTitle>
        <BrownieCard>
          <BrownieImage src={brownie.productImage} alt={brownie.productName} />
          <BrownieInfo>
            <BrownieName>{brownie.productName}</BrownieName>
            <BrownieDescription>
              Our signature brownie is rich, dense, and packed with chocolate flavor.
            </BrownieDescription>
            <BrowniePrice>Rs. {parseFloat(brownie.productUnitPrice).toFixed(2)}</BrowniePrice>
            <QuantitySelector>
              <QuantityLabel>Quantity:</QuantityLabel>
              <QuantityControls>
                <QuantityButton
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                >
                  -
                </QuantityButton>
                <QuantityValue>{quantity}</QuantityValue>
                <QuantityButton onClick={() => setQuantity(prev => prev + 1)}>
                  +
                </QuantityButton>
              </QuantityControls>
            </QuantitySelector>
            <TotalPrice>Total: Rs. {calculateTotalPrice()}</TotalPrice>
            <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
            <BrownieFeatures>
              <FeatureTitle>Product Features:</FeatureTitle>
              <FeatureList>
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
              </FeatureList>
            </BrownieFeatures>
          </BrownieInfo>
        </BrownieCard>
      </PageContainer>
  );
};

export default Brownies;
