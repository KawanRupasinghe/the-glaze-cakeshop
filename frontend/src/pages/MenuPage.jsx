import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "../components/Navbar";
import ProductService from "../services/ProductService";

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #F5E6CC;
`;

const Title = styled.h1`
  font-family: 'Inter', serif;
  font-size: 60px;
  font-weight: 200;
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: center;
  color: #665A38;

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

// 🔍 Search Bar Styling
const SearchInput = styled.input`
  width: 60%;
  max-width: 400px;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 8px;
  border: 2px solid #b3b6b7;
  background: #fffff;
  color: #d7dbdd;
  outline: none;
  margin-bottom: 30px;
  transition: 0.3s ease;

  &:focus {
    border-color: #d7dbdd;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const MenuGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  text-align: center;
  background-color: #ecf0f1;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ImageContainer = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 24px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemName = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  color: #000;
  margin-bottom: 16px;
  font-weight: 500;
`;

const PriceInfo = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #665A38;
  opacity: 0.8;
  line-height: 1.6;
`;

const MenuPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  // Fetch product types from backend
  useEffect(() => {
    ProductService.getAllProductTypes()
        .then((response) => {
          const fetchedProducts = response.data.map((product) => ({
            id: product.productTypeId, // Hidden but available in code
            name: product.productTypeName,
            image: `/${product.imageUrl}`,
            priceInfo: [`Prices Starting At` ,`${product.priceInfo}`], // Correct syntax
            path: `/menu/${product.productTypeName.toLowerCase()}`,
          }));
          setMenuItems(fetchedProducts);
        })
        .catch((error) => console.error("Error fetching product types:", error));
  }, []);

  // Filter menu items based on search input
  const filteredItems = menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <PageContainer>
        <Navbar />
        <Title>Our Creations</Title>
        <SearchInput
            type="text"
            placeholder="🔍 Search for an item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MenuGrid>
          {filteredItems.map((item, index) => (
              <MenuItem key={item.id || index} onClick={() => navigate(item.path)}>
                <ImageContainer>
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </ImageContainer>
                <ItemName>{item.name}</ItemName>
                <PriceInfo>
                  {item.priceInfo.map((line, i) => (
                      <div key={i}>{line}</div>
                  ))}
                </PriceInfo>
              </MenuItem>
          ))}
        </MenuGrid>
      </PageContainer>
  );
};

export default MenuPage;