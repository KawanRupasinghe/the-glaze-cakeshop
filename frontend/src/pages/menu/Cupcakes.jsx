import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import API_BASE_URL from "../../config.jsx";

// Styled Components (unchanged)
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

const CategoryTitle = styled.h1`
  font-family: 'Inter', serif;
  font-size: 60px;
  font-weight: 200;
  color: #665A38;
  margin: 0 0 2rem 0;
  align-items: center;
  text-align: center;
`;

const CupcakesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-content: center;
`;

const CupcakeCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CupcakeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CupcakeInfo = styled.div`
  padding: 1.5rem;
`;

const CupcakeName = styled.h3`
  font-size: 1.5rem;
  color: #665A38;
  margin: 0 0 0.5rem 0;
`;

const CupcakeDescription = styled.p`
  color: #000;
  margin: 0 0 1rem 0;
  line-height: 1.6;
`;

const CupcakePrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #665A38;
  margin-bottom: 1rem;
`;

const FlavorSelector = styled.div`
  margin-bottom: 1rem;
`;

const FlavorLabel = styled.p`
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: #000;
`;

const FlavorOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FlavorOption = styled.button`
  padding: 0.5rem 1rem;
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

const Cupcakes = () => {
  const navigate = useNavigate();
  const [cupcakes, setCupcakes] = useState([]);
  const [selections, setSelections] = useState([]);
  const [flavorOptions, setFlavorOptions] = useState([]);

  // Fetch cupcakes from the backend
  useEffect(() => {
    const fetchCupcakes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cupcake/all`);
        const data = await response.json();

        // Group cupcakes by name to derive unique cupcake types
        const uniqueCupcakes = [];
        const flavors = [];
        const seenNames = new Set();
        const seenFlavors = new Set();

        data.forEach(item => {
          if (!seenNames.has(item.productName)) {
            seenNames.add(item.productName);
            uniqueCupcakes.push({
              id: item.productId,
              name: item.productName,
              description: `Our delicious ${item.productName.toLowerCase()} with a variety of flavors.`,
              image: item.productImage,
            });
          }
          if (!seenFlavors.has(item.productFlavour)) {
            seenFlavors.add(item.productFlavour);
            flavors.push({
              id: flavors.length + 1,
              name: item.productFlavour,
              price: parseFloat(item.productPrice),
            });
          }
        });

        setCupcakes(uniqueCupcakes);
        setFlavorOptions(flavors);

        // Initialize selections
        const initialSelections = uniqueCupcakes.map(cupcake => ({
          cupcakeId: cupcake.id,
          selectedFlavor: flavors[0], // Default to first flavor
          quantity: 1,
        }));
        setSelections(initialSelections);
      } catch (error) {
        console.error('Error fetching cupcakes:', error);
      }
    };

    fetchCupcakes();
  }, []);

  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };

  // Handle flavor selection
  const handleFlavorSelect = (cupcakeId, flavor) => {
    setSelections(prev =>
        prev.map(item =>
            item.cupcakeId === cupcakeId
                ? { ...item, selectedFlavor: flavor }
                : item
        )
    );
  };

  // Handle quantity change
  const handleQuantityChange = (cupcakeId, newQuantity) => {
    setSelections(prev =>
        prev.map(item =>
            item.cupcakeId === cupcakeId
                ? { ...item, quantity: Math.max(1, newQuantity) }
                : item
        )
    );
  };

  // Calculate price for a cupcake
  const calculatePrice = (selection) => {
    const flavorPrice = selection.selectedFlavor.price;
    return flavorPrice * selection.quantity;
  };

  // Handle add to cart
  const handleAddToCart = (cupcake, selection) => {
    const cartItem = {
      id: cupcake.id,
      name: cupcake.name,
      flavor: selection.selectedFlavor.name,
      price: calculatePrice(selection),
      quantity: selection.quantity,
      image: cupcake.image || '/placeholder.svg',
    };

    try {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (!Array.isArray(cart)) cart = [];

      const existingItemIndex = cart.findIndex(
          item => item.id === cartItem.id && item.flavor === cartItem.flavor
      );

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += cartItem.quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Cart updated:', cart); // Debugging
      alert(`Added ${cartItem.quantity} ${cartItem.flavor} ${cartItem.name} to cart!`);
    } catch (err) {
      console.error('Error saving to localStorage:', err);
      alert('Failed to add item to cart.');
    }
  };

  return (
      <PageContainer>
        <BackButton onClick={handleBack}>← Back to categories</BackButton>

        <CategoryTitle>Cupcakes</CategoryTitle>

        <CupcakesContainer>
          {cupcakes.map(cupcake => {
            const selection = selections.find(s => s.cupcakeId === cupcake.id);
            if (!selection) return null; // Prevent rendering if selection is not ready

            const totalPrice = calculatePrice(selection);

            return (
                <CupcakeCard key={cupcake.id}>
                  <CupcakeImage src={cupcake.image} alt={cupcake.name} />
                  <CupcakeInfo>
                    <CupcakeName>{cupcake.name}</CupcakeName>
                    <CupcakeDescription>{cupcake.description}</CupcakeDescription>
                    <CupcakePrice>Rs. {selection.selectedFlavor.price.toFixed(2)}</CupcakePrice>

                    <FlavorSelector>
                      <FlavorLabel>Select Flavor:</FlavorLabel>
                      <FlavorOptions>
                        {flavorOptions.map(flavor => (
                            <FlavorOption
                                key={flavor.id}
                                selected={selection.selectedFlavor.id === flavor.id}
                                onClick={() => handleFlavorSelect(cupcake.id, flavor)}
                            >
                              {flavor.name}
                            </FlavorOption>
                        ))}
                      </FlavorOptions>
                    </FlavorSelector>

                    <QuantitySelector>
                      <QuantityLabel>Quantity:</QuantityLabel>
                      <QuantityControls>
                        <QuantityButton
                            onClick={() => handleQuantityChange(cupcake.id, selection.quantity - 1)}
                            disabled={selection.quantity <= 1}
                        >
                          -
                        </QuantityButton>
                        <QuantityValue>{selection.quantity}</QuantityValue>
                        <QuantityButton
                            onClick={() => handleQuantityChange(cupcake.id, selection.quantity + 1)}
                        >
                          +
                        </QuantityButton>
                      </QuantityControls>
                    </QuantitySelector>

                    <TotalPrice>Total: Rs. {totalPrice.toFixed(2)}</TotalPrice>

                    <AddToCartButton onClick={() => handleAddToCart(cupcake, selection)}>
                      Add to Cart
                    </AddToCartButton>
                  </CupcakeInfo>
                </CupcakeCard>
            );
          })}
        </CupcakesContainer>
      </PageContainer>
  );
};

export default Cupcakes;