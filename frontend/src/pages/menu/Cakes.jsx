import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../../components/Navbar';
import API_BASE_URL from "../../config.jsx";

// Styled Components
const PageContainer = styled.div`
  margin: 0 auto;
  padding: 125px 150px;
  color: #F5E6CC;
  background: #fff;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const Header = styled.header`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: 'Inter', serif;
  font-size: 60px;
  font-weight: 200;
  margin-bottom: 0.5rem;
  margin-top: 10px;
  text-align: center;
  color: #665A38;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #665A38;
`;

const CakeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  color: #665A38;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? '#665A38' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? '#665A38' : '#e0e0e0'};
  }
`;

const CakeCard = ({ cake, handleCakeClick }) => {
  return (
      <div onClick={() => handleCakeClick(cake.productId)} style={styles.card}>
        <img src={cake.productImage} alt={cake.productName} style={styles.image} />
        <div style={styles.cardInfo}>
          <h3 style={styles.name}>{cake.productName}</h3>
          <p style={styles.description}>{cake.productDescription}</p>
          <p style={styles.price}>{cake.productPrice}</p>
          <button
              style={styles.viewDetailsButton}
              onClick={(e) => {
                e.stopPropagation();
                handleCakeClick(cake.productId);
              }}
          >
            View Details
          </button>
        </div>
      </div>
  );
};

const styles = {
  card: {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    backgroundColor: '#f2f3f4',
    color: '#F5E6CC',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '300px',
    padding: '10px 10px',
    objectFit: 'cover',
    borderRadius: '20px',
  },
  cardInfo: {
    padding: '1.5rem',
    textAlign: 'center',
    color: '#665A38',
  },
  name: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  description: {
    color: '#616a6b',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  price: {
    fontWeight: 'bold',
    color: '#616a6b',
  },
  viewDetailsButton: {
    backgroundColor: 'transparent',
    color: '#665A38',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    marginTop: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }
};

const Cakes = () => {
  const navigate = useNavigate();
  const [cakes, setCakes] = useState([]);
  const [filteredCakes, setFilteredCakes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter types
  const filterTypes = ['all', 'chocolate', 'vanilla', 'fruit', 'specialty'];

  // Fetch cakes from API
  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cake/all`);
        if (!response.ok) throw new Error('Failed to fetch cakes');
        const data = await response.json();
        setCakes(data);
        setFilteredCakes(data); // Initialize filtered cakes
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  // Filter cakes based on selected filter type, price range, and search term
  useEffect(() => {
    let tempFilteredCakes = cakes;

    // Apply cake type filter
    if (activeFilter !== 'all') {
      tempFilteredCakes = tempFilteredCakes.filter(cake => cake.productType === activeFilter);
    }

    // Apply price range filter
    if (minPrice !== '') {
      tempFilteredCakes = tempFilteredCakes.filter(cake => parseFloat(cake.productPrice.replace('Rs.', '').trim()) >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      tempFilteredCakes = tempFilteredCakes.filter(cake => parseFloat(cake.productPrice.replace('Rs.', '').trim()) <= parseFloat(maxPrice));
    }

    // Apply search filter
    if (searchTerm !== '') {
      tempFilteredCakes = tempFilteredCakes.filter(cake =>
        cake.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cake.productDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCakes(tempFilteredCakes);
  }, [activeFilter, minPrice, maxPrice, searchTerm, cakes]);

  // Handle click on cake card
  const handleCakeClick = (cakeId) => {
    navigate(`/menu/cakes/${cakeId}`);
  };

  if (loading) return <PageContainer>Loading...</PageContainer>;
  if (error) return <PageContainer>Error: {error}</PageContainer>;

  return (
      <PageContainer>
        <Navbar />
        <Header>
          <Title>Cake Designs</Title>
          <Subtitle>Explore our delicious cake collection</Subtitle>
        </Header>

        {/* Filter Section */}
        <FilterContainer>
          {/* First Row (Cake Types) */}
          <FilterRow>
            {filterTypes.map(type => (
                <FilterButton
                    key={type}
                    active={activeFilter === type}
                    onClick={() => setActiveFilter(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </FilterButton>
            ))}
          </FilterRow>

          {/* Second Row (Price Range and Search) */}
          <FilterRow>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              placeholder="Search by name or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </FilterRow>
        </FilterContainer>

        <CakeGrid>
          {filteredCakes.map(cake => (
              <CakeCard
                  key={cake.productId}
                  cake={cake}
                  handleCakeClick={handleCakeClick}
              />
          ))}
        </CakeGrid>
      </PageContainer>
  );
};

export default Cakes;
