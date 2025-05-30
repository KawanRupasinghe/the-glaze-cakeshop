"use client";

import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AdminNavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #e3e6e8;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Logo = styled.div`
  width: 130px;
  height: 130px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const AdminTabs = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 16px;
    font-size: 14px;
  }
`;

const TabLink = styled.a`
  color: #665A38;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #8B8055;
    transform: translateY(-2px);
  }
`;

const AdminIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #665A38;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  cursor: default;

  svg {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    font-size: 14px;

    svg {
      font-size: 18px;
    }
  }
`;

export const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <AdminNavContainer>
      <Logo onClick={() => navigate("/admindashboard")}>
        <img src="/logo.png" alt="The Glaze Logo" />
      </Logo>

      <AdminTabs>
        <TabLink onClick={() => navigate("/admindashboard")}>Home</TabLink>
        <TabLink onClick={() => navigate("/admin/products")}>Products</TabLink>
        <TabLink onClick={() => navigate("/admin/orders")}>Orders</TabLink>
        <TabLink onClick={() => navigate("/admin/deliveries")}>Deliveries</TabLink>
        <TabLink onClick={() => navigate("/admin/sales")}>Sales</TabLink>
        <TabLink onClick={() => navigate("/admin/customers")}>Customers</TabLink>
      </AdminTabs>

      <AdminIconWrapper>
        <FiUser />
        Admin
      </AdminIconWrapper>
    </AdminNavContainer>
  );
};
