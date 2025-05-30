"use client"

import { AlertTriangle, ArrowLeft, Lock, LogOut, Menu, ShoppingBag, Truck, User, X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

// Dummy user data
const dummyUser = {
  email: "pawan@example.com",
  firstName: "Pawan",
  lastName: "Kumarage",
  phoneNumber: "+94 71 345 6789",
  addressLine1: "Aniwatta Road",
  addressLine2: "Primrose Gardens",
  city: "Kandy",
  state: "Central",
}

// Main container
const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f3ef;
`

// Sidebar styles
const Sidebar = styled.div`
  width: 260px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;

  @media (max-width: 768px) {
    display: none;
  }
`

const SidebarHeader = styled.div`
  padding: 1.5rem;
`

const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #665A38;
  margin-bottom: 1.5rem;
`

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const SidebarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  text-align: left;
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? "500" : "400")};
  cursor: pointer;
  width: 100%;
  background: ${(props) => (props.active ? "#8B8055" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#665A38")};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.active ? "#8B8055" : "rgba(139, 128, 85, 0.1)")};
    color: ${(props) => (props.active ? "white" : "#665A38")};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

// Content styles
const Content = styled.div`
  flex-grow: 1;
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 2.5rem;
  }
`

const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    display: none;
  }
`

const MobileTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #665A38;
`

const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #665A38;

  &:hover {
    background: rgba(139, 128, 85, 0.1);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`

const MobileMenuContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: white;
  z-index: 51;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease;
`

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  cursor: pointer;
  color: #665A38;

  &:hover {
    background: rgba(139, 128, 85, 0.1);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`

// Card styles
const Card = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 48rem;
  margin: 0 auto;
`

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f1f1f1;
`

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #665A38;
  margin-bottom: 0.5rem;
`

const CardDescription = styled.p`
  color: #666;
  font-size: 0.875rem;
`

const CardContent = styled.div`
  padding: 1.5rem;
`

// Form styles
const FormGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: ${(props) => props.columns || "1fr"};
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: ${(props) => props.mb || "0"};
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #444;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: ${(props) => (props.disabled ? "#f5f5f5" : "white")};
  color: ${(props) => (props.disabled ? "#666" : "#333")};
  
  &:focus {
    outline: none;
    border-color: #8B8055;
    box-shadow: 0 0 0 2px rgba(139, 128, 85, 0.2);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${(props) => {
    if (props.variant === "primary") {
      return `
        background: #8B8055;
        color: white;
        border: none;
        
        &:hover {
          background: #665A38;
        }
      `
    } else if (props.variant === "destructive") {
      return `
        background: #e11d48;
        color: white;
        border: none;
        
        &:hover {
          background: #be123c;
        }
      `
    } else {
      return `
        background: transparent;
        color: #665A38;
        border: 1px solid #ddd;
        
        &:hover {
          background: rgba(139, 128, 85, 0.1);
        }
      `
    }
  }}
`

// Empty state styles
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
`

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #8B8055;
  
  svg {
    width: 2rem;
    height: 2rem;
  }
`

const EmptyTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`

const EmptyDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 100;
`

const ModalContent = styled.div`
  background: white;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 28rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f1f1f1;
`

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const ModalDescription = styled.p`
  color: #666;
  font-size: 0.875rem;
`

const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  border-top: 1px solid #f1f1f1;
`

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [userData, setUserData] = useState(dummyUser)
  const [isEditing, setIsEditing] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogout = () => {
    // In a real app, this would call your auth context's logout function
    navigate("/login")
  }

  const handleSave = () => {
    // In a real app, this would save the user data to your backend
    setIsEditing(false)
    // Show a success toast or message
  }

  const handleDeleteAccount = () => {
    // In a real app, this would delete the user's account
    setDeleteModalOpen(false)
    handleLogout()
  }

  const menuItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "deliveries", label: "My Deliveries", icon: Truck },
    { id: "password", label: "Password Reset", icon: Lock },
  ]

  return (
    <PageWrapper>
      {/* Sidebar for desktop */}
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>Account</SidebarTitle>
          <SidebarNav>
            {menuItems.map((item) => (
              <SidebarButton
                key={item.id}
                active={activeTab === item.id}
                onClick={() => {
                  if (item.id === "password") {
                    navigate("/forgot-password")
                  } else {
                    setActiveTab(item.id)
                  }
                }}
              >

                <item.icon />
                {item.label}
              </SidebarButton>
            ))}
          </SidebarNav>
        </SidebarHeader>
        <SidebarFooter>
          <SidebarButton onClick={() => navigate("/dashboard")}>
            <ArrowLeft />
            Back to Dashboard
          </SidebarButton>
          <SidebarButton onClick={handleLogout}>
            <LogOut />
            Logout
          </SidebarButton>
        </SidebarFooter>
      </Sidebar>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)}>
        <MobileMenuContent isOpen={mobileMenuOpen} onClick={(e) => e.stopPropagation()}>
          <MobileMenuHeader>
            <SidebarTitle>Account</SidebarTitle>
            <CloseButton onClick={() => setMobileMenuOpen(false)}>
              <X />
            </CloseButton>
          </MobileMenuHeader>
          <SidebarNav>
            {menuItems.map((item) => (
              <SidebarButton
                key={item.id}
                active={activeTab === item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setMobileMenuOpen(false)
                }}
              >
                <item.icon />
                {item.label}
              </SidebarButton>
            ))}
          </SidebarNav>
          <SidebarFooter>
            <SidebarButton onClick={() => navigate("/dashboard")}>
              <ArrowLeft />
              Back to Dashboard
            </SidebarButton>
            <SidebarButton onClick={handleLogout}>
              <LogOut />
              Logout
            </SidebarButton>
          </SidebarFooter>
        </MobileMenuContent>
      </MobileMenu>

      {/* Main content */}
      <Content>
        {/* Mobile header */}
        <MobileHeader>
          <MobileTitle>My Account</MobileTitle>
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            <Menu />
          </MobileMenuButton>
        </MobileHeader>

        {/* Profile tab */}
        {activeTab === "profile" && (
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your personal information and address</CardDescription>
            </CardHeader>
            <CardContent>
              <FormGrid columns="1fr 1fr">
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={userData.email} disabled />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </FormGroup>
              </FormGrid>

              <FormGrid columns="1fr 1fr" style={{ marginTop: "1.5rem" }}>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </FormGroup>
              </FormGrid>

              <FormGroup style={{ marginTop: "1.5rem" }}>
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  value={userData.addressLine1}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </FormGroup>

              <FormGroup style={{ marginTop: "1.5rem" }}>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  value={userData.addressLine2}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </FormGroup>

              <FormGrid columns="1fr 1fr" style={{ marginTop: "1.5rem" }}>
                <FormGroup>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={userData.city} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={userData.state} onChange={handleChange} disabled={!isEditing} />
                </FormGroup>
              </FormGrid>

              <ButtonGroup>
                <Button variant="primary" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
                <Button variant="destructive" onClick={() => setDeleteModalOpen(true)}>
                  Delete Account
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        )}

        {/* Orders tab */}
        {activeTab === "orders" && (
          <Card>
            <CardHeader>
              <CardTitle>My Orders</CardTitle>
              <CardDescription>View and manage your order history</CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyState>
                <IconWrapper>
                  <ShoppingBag />
                </IconWrapper>
                <EmptyTitle>No orders yet</EmptyTitle>
                <EmptyDescription>When you place an order, it will appear here.</EmptyDescription>
                <Button variant="primary" onClick={() => navigate("/shop")}>
                  Browse Products
                </Button>
              </EmptyState>
            </CardContent>
          </Card>
        )}

        {/* Deliveries tab */}
        {activeTab === "deliveries" && (
          <Card>
            <CardHeader>
              <CardTitle>My Deliveries</CardTitle>
              <CardDescription>Track your deliveries and shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyState>
                <IconWrapper>
                  <Truck />
                </IconWrapper>
                <EmptyTitle>No deliveries yet</EmptyTitle>
                <EmptyDescription>
                  Your delivery information will appear here once you have placed an order.
                </EmptyDescription>
              </EmptyState>
            </CardContent>
          </Card>
        )}

        {/* Password tab */}
        {activeTab === "password" && (
          <Card>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>Change your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <FormGroup mb="1.5rem">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </FormGroup>

              <FormGroup mb="1.5rem">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </FormGroup>

              <FormGroup mb="1.5rem">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </FormGroup>

              <Button variant="primary">Reset Password</Button>
            </CardContent>
          </Card>
        )}
      </Content>

      {/* Delete account confirmation modal */}
      <ModalOverlay isOpen={deleteModalOpen} onClick={() => setDeleteModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Are you absolutely sure?</ModalTitle>
            <ModalDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              <AlertTriangle size={16} />
              Delete Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </PageWrapper>
  )
}

export default Profile
