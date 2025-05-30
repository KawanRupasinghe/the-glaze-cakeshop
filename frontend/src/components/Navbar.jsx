import React, { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa'; // Import the outlined Profile Icon
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthProvider";

// Navbar Styles (unchanged)
const NavContainer = styled.nav`
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

const NavLinks = styled.div`
    display: flex;
    gap: 40px;
    align-items: center;

    @media (max-width: 768px) {
        display: none;
    }
`;

const NavLink = styled.a`
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

const Button = styled.button`
    background: #665A38;
    border: none;
    border-radius: 12px;
    padding: 12px 32px;
    color: #FFFFFF;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-right: 30px;

    &:hover {
        background: #7d6c43;
        transform: translateY(-2px);
    }
`;

const ProfileButton = styled(Button)`
    background: #665A38;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 50%; /* Make it round */
    padding: 12px; /* Make sure the icon is centered */
    width: 50px; /* Set width and height to make it circular */
    height: 50px;
    min-width: 50px; /* Ensure consistent size */
    max-width: 50px; /* Ensure consistent size */
`;

const CartIconWrapper = styled.div`
    position: relative;
    margin-right: 30px;
    cursor: pointer;
`;

const CartBadge = styled.div`
    position: absolute;
    top: -6px;
    right: -6px;
    background-color: #665A38;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 50%;
`;

const CartIcon = styled(FiShoppingCart)`
    font-size: 28px;
    color: #665A38;

    &:hover {
        color: #8B8055;
        transform: scale(1.1);
        transition: 0.2s;
    }
`;

export const Navbar = () => {
    const navigate = useNavigate();
    const { user, logOut } = useAuth();
    const [cartCount, setCartCount] = useState(0);

    // Load cart count from localStorage
    const updateCartCount = () => {
        try {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                const parsedCart = JSON.parse(storedCart);
                if (Array.isArray(parsedCart)) {
                    const totalQuantity = parsedCart.reduce((acc, item) => acc + (item.quantity || 0), 0);
                    setCartCount(totalQuantity);
                    console.log('Cart count updated:', totalQuantity); // Debugging
                } else {
                    setCartCount(0);
                }
            } else {
                setCartCount(0);
            }
        } catch (err) {
            console.error('Error loading cart count:', err);
            setCartCount(0);
        }
    };

    // Load count on mount and listen for storage changes
    useEffect(() => {
        updateCartCount();
        const handleStorageChange = (e) => {
            if (e.key === 'cart') {
                updateCartCount();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLoginLogout = () => {
        if (user) {
            logOut();
        } else {
            navigate("/login");
        }
    };

    return (
        <NavContainer>
            <Logo onClick={() => navigate("/")}>
                <img src="/logo.png" alt="The Glaze Logo" />
            </Logo>

            <NavLinks>
                <NavLink onClick={() => navigate("/")}>Home</NavLink>
                <NavLink onClick={() => navigate("/menu")}>Menu</NavLink>
                <NavLink onClick={() => navigate("/about")}>About Us</NavLink>
                <NavLink onClick={() => navigate("/contact")}>Contact Us</NavLink>
            </NavLinks>

            <div style={{ display: "flex", alignItems: "center" }}>
                <CartIconWrapper onClick={() => navigate("/cart")}>
                    <CartIcon />
                    {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
                </CartIconWrapper>

                {user ? (
                    <ProfileButton onClick={() => navigate("/profile")}>
                        <FaRegUser /> {/* Profile icon (outlined version) */}
                    </ProfileButton>
                ) : (
                    <Button onClick={handleLoginLogout}>Log In</Button>
                )}
            </div>
        </NavContainer>
    );
};
