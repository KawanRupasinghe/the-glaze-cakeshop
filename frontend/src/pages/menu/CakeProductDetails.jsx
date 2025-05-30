import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import API_BASE_URL from "../../config.jsx";

// Styled Components
const PageContainer = styled.div`
  margin: 0 auto;
  padding: 80px 150px;
  color: #F5E6CC;
  background: #fff;
  align-items: center;
  min-height: 100vh;
  width: 100;
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

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.6};
  border: ${props => props.active ? '2px solid #ccc' : '2px solid transparent'};
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductName = styled.h1`
  font-family: 'Inter', serif;
  font-size: 60px;
  font-weight: 200;
  color: #665A38;
  margin: 0;
`;

const ProductDescription = styled.p`
  color: #000;
  line-height: 1.6;
  font-size: 1rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;

const Price = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: #ccc;
`;

const SizeSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SizeLabel = styled.p`
  font-weight: bold;
  margin: 0;
  color: #000;
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SizeOption = styled.button`
  padding: 0.8rem 1.5rem;
  border: 2px solid ${props => props.selected ? '#000' : '#ccc'};
  background-color: ${props => props.selected ? '#fff' : '#fff'};
  color: ${props => props.selected ? '#000000' : '#665A38'};
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
  transition: all 0.2s ease;

  &:hover {
    border-color: #665A38;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background-color: #ddd;
  }

  &:disabled {
    color: #555;
    cursor: not-allowed;
  }
`;

const QuantityValue = styled.span`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #000;
`;

const AddToCartButton = styled.button`
  background-color: #665A38;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #A79D75;
  }

  &:disabled {
    background-color: #A79D75;
    cursor: not-allowed;
  }
`;

const ProductFeatures = styled.div`
  margin-top: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const FeatureList = styled.ul`
  padding-left: 1.5rem;
  color: #fff;

  li {
    margin-bottom: 0.5rem;
  }
`;
const CakeProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const cakeResponse = await fetch(`${API_BASE_URL}/cake/all`);
        if (!cakeResponse.ok) throw new Error('Failed to fetch cake');
        const cakes = await cakeResponse.json();
        const foundProduct = cakes.find(cake => cake.productId === parseInt(id));

        if (!foundProduct) throw new Error('Product not found');

        foundProduct.images = [
          foundProduct.productImage,
          foundProduct.productImage,
          foundProduct.productImage,
          foundProduct.productImage
        ];

        foundProduct.features = [
          "Premium ingredients",
          "Customizable decorations",
          "Suitable for vegetarians",
          "Refrigerates up to 3 days"
        ];

        setProduct(foundProduct);

        const sizeResponse = await fetch(`${API_BASE_URL}/cake/allPrices`);
        if (!sizeResponse.ok) throw new Error('Failed to fetch sizes');
        const sizes = await sizeResponse.json();
        const formattedSizes = sizes.map(size => ({
          id: size.quantityId,
          name: size.quantity,
          priceAdjustment: 0,
          basePrice: parseFloat(size.quantityPrice.replace('RS.', '').replace(',', ''))
        }));
        setSizeOptions(formattedSizes);
        setSelectedSize(formattedSizes[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const calculatePrice = () => {
    if (!selectedSize) return 0;
    return (selectedSize.basePrice * quantity).toFixed(2);
  };

  const updateQuantity = (action) => {
    setQuantity(prev => {
      if (action === 'increment') return prev + 1;
      if (action === 'decrement' && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      alert('Please select a product and size.');
      return;
    }

    const cartItem = {
      id: product.productId,
      name: product.productName,
      size: selectedSize.name,
      price: parseFloat(calculatePrice()),
      quantity,
      image: product.productImage || '/placeholder.svg' // Fallback image
    };

    try {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (!Array.isArray(cart)) cart = [];

      const existingItemIndex = cart.findIndex(
          item => item.id === cartItem.id && item.size === cartItem.size
      );

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += cartItem.quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Cart updated:', cart); // Debugging
      alert(`Added ${quantity} ${selectedSize.name} ${product.productName} to cart!`);
    } catch (err) {
      console.error('Error saving to localStorage:', err);
      alert('Failed to add item to cart.');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
        <PageContainer>
          <p>Loading product details...</p>
        </PageContainer>
    );
  }

  if (error || !product) {
    return (
        <PageContainer>
          <p>{error || 'Product not found'}</p>
          <BackButton onClick={handleBack}>← Back to cakes</BackButton>
        </PageContainer>
    );
  }

  return (
      <PageContainer>
        <BackButton onClick={handleBack}>← Back to cakes</BackButton>
        <ProductContainer>
          <ImageContainer>
            <MainImage src={product.images[selectedImage] || "/placeholder.svg"} alt={product.productName} />
            <ThumbnailContainer>
              {product.images.map((image, index) => (
                  <Thumbnail
                      key={index}
                      src={image}
                      alt={`${product.productName} view ${index + 1}`}
                      active={selectedImage === index}
                      onClick={() => setSelectedImage(index)}
                  />
              ))}
            </ThumbnailContainer>
          </ImageContainer>
          <ProductInfo>
            <ProductName>{product.productName}</ProductName>
            <PriceContainer>
              <Price>Rs. {calculatePrice()}</Price>
            </PriceContainer>
            <ProductDescription>{product.productDescription}</ProductDescription>
            <SizeSelector>
              <SizeLabel>Select Size:</SizeLabel>
              <SizeOptions>
                {sizeOptions.map(size => (
                    <SizeOption
                        key={size.id}
                        selected={selectedSize && selectedSize.id === size.id}
                        onClick={() => setSelectedSize(size)}
                    >
                      {size.name}
                    </SizeOption>
                ))}
              </SizeOptions>
            </SizeSelector>
            <QuantitySelector>
              <QuantityLabel>Quantity:</QuantityLabel>
              <QuantityControls>
                <QuantityButton
                    onClick={() => updateQuantity('decrement')}
                    disabled={quantity <= 1}
                >
                  -
                </QuantityButton>
                <QuantityValue>{quantity}</QuantityValue>
                <QuantityButton
                    onClick={() => updateQuantity('increment')}
                >
                  +
                </QuantityButton>
              </QuantityControls>
            </QuantitySelector>
            <AddToCartButton onClick={handleAddToCart}>
              Add to Cart
            </AddToCartButton>
            <ProductFeatures>
              <FeatureTitle>Product Features:</FeatureTitle>
              <FeatureList>
                {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
              </FeatureList>
            </ProductFeatures>
          </ProductInfo>
        </ProductContainer>
      </PageContainer>
  );
};

export default CakeProductDetails;