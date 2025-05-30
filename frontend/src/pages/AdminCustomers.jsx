"use client"

import { useState } from "react"
import styled from "styled-components"
import { AdminNavbar } from "../components/AdminNavbar"
import { Package, Search, ShoppingBag, User, X } from "lucide-react"

const PageContainer = styled.div`
  min-height: 100vh;
  background: #eeeeee;
  padding-top: 130px;
  overflow: hidden;
`

const Section = styled.div`
  padding: 40px 80px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`

const PageTitle = styled.h1`
  color: #665A38;
  font-size: 28px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`

const SearchBar = styled.div`
  position: relative;
  max-width: 400px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 42px;
  border-radius: 8px;
  border: 1px solid #e0dfd6;
  background: #fff;
  color: #665A38;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #8B8055;
  }

  &::placeholder {
    color: #a9a28c;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #8B8055;
`

const CustomersTable = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(102, 90, 56, 0.1);
  overflow: hidden;
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 16px 24px;
  background: #f0efe6;
  border-bottom: 1px solid #e0dfd6;
  color: #665A38;
  font-weight: 600;
  font-size: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 16px 24px;
  border-bottom: 1px solid #f0efe6;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #fdfcf7;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: block;
    position: relative;
    padding: 16px;
  }
`

const TableCell = styled.div`
  color: #665A38;
  font-size: 14px;
  
  @media (max-width: 768px) {
    padding: 4px 0;
    display: flex;
    
    &:before {
      content: "${(props) => props.label}";
      width: 100px;
      font-weight: 600;
      margin-right: 16px;
    }
  }
`

const CustomerCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
`

const CustomerAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f0efe6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8B8055;
`

// Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0efe6;
`

const ModalTitle = styled.h2`
  color: #665A38;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #8B8055;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #f0efe6;
    color: #665A38;
  }
`

const ModalBody = styled.div`
  padding: 20px;
`

const CustomerInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const InfoCard = styled.div`
  background: #f9f8f3;
  border-radius: 8px;
  padding: 16px;
`

const InfoTitle = styled.div`
  font-weight: 600;
  color: #665A38;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const InfoText = styled.div`
  color: #8B8055;
  font-size: 14px;
  line-height: 1.5;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const InfoLabel = styled.span`
  color: #8B8055;
`

const InfoValue = styled.span`
  color: #665A38;
  font-weight: 500;
`

const SectionTitle = styled.h3`
  color: #665A38;
  font-size: 18px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const OrdersTable = styled.div`
  width: 100%;
  border: 1px solid #f0efe6;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
`

const OrderTableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 12px 16px;
  background: #f0efe6;
  color: #665A38;
  font-weight: 600;
  font-size: 14px;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const OrderTableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 12px 16px;
  border-bottom: 1px solid #f0efe6;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    display: block;
    position: relative;
    padding: 12px 16px;
  }
`

const OrderCell = styled.div`
  color: #665A38;
  font-size: 14px;
  
  @media (max-width: 768px) {
    padding: 4px 0;
    display: flex;
    
    &:before {
      content: "${(props) => props.label}";
      width: 100px;
      font-weight: 600;
      margin-right: 16px;
    }
  }
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#FFF4E5"
      case "processing":
        return "#E5F6FF"
      case "completed":
        return "#E7F7EE"
      case "cancelled":
        return "#FFEBEE"
      default:
        return "#F0EFE6"
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#E67E22"
      case "processing":
        return "#3498DB"
      case "completed":
        return "#27AE60"
      case "cancelled":
        return "#E53935"
      default:
        return "#8B8055"
    }
  }};
`

const EmptyState = styled.div`
  text-align: center;
  padding: 20px;
  color: #8B8055;
`

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  // Mock customers data
  const customers = [
    {
      id: 1,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+91 98765 43210",
      totalOrders: 5,
      totalSpent: "Rs. 42,500.00",
      joinDate: "May 10, 2022",
      address: "123 Baker Street, Mumbai, Maharashtra, 400001",
      orders: [
        { id: 1042, date: "May 4, 2023", status: "pending", total: "Rs. 13,250.00" },
        { id: 1030, date: "Apr 22, 2023", status: "completed", total: "Rs. 9,800.00" },
        { id: 1018, date: "Apr 10, 2023", status: "completed", total: "Rs. 19,450.00" },
      ],
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+91 98765 12345",
      totalOrders: 3,
      totalSpent: "Rs. 28,600.00",
      joinDate: "Jun 15, 2022",
      address: "456 Park Avenue, Delhi, 110001",
      orders: [
        { id: 1041, date: "May 4, 2023", status: "processing", total: "Rs. 9,800.00" },
        { id: 1022, date: "Apr 15, 2023", status: "completed", total: "Rs. 18,800.00" },
      ],
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+91 98765 67890",
      totalOrders: 8,
      totalSpent: "Rs. 76,350.00",
      joinDate: "Mar 5, 2022",
      address: "789 Lake View, Bangalore, Karnataka, 560001",
      orders: [
        { id: 1040, date: "May 3, 2023", status: "completed", total: "Rs. 19,550.00" },
        { id: 1035, date: "Apr 28, 2023", status: "completed", total: "Rs. 12,500.00" },
        { id: 1025, date: "Apr 18, 2023", status: "completed", total: "Rs. 22,300.00" },
        { id: 1015, date: "Apr 5, 2023", status: "completed", total: "Rs. 22,000.00" },
      ],
    },
    {
      id: 4,
      name: "Robert Brown",
      email: "robert.brown@example.com",
      phone: "+91 98765 98765",
      totalOrders: 2,
      totalSpent: "Rs. 11,730.00",
      joinDate: "Jul 20, 2022",
      address: "101 Hill Road, Chennai, Tamil Nadu, 600001",
      orders: [
        { id: 1039, date: "May 3, 2023", status: "cancelled", total: "Rs. 5,600.00" },
        { id: 1028, date: "Apr 20, 2023", status: "completed", total: "Rs. 6,130.00" },
      ],
    },
    {
      id: 5,
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      phone: "+91 98765 23456",
      totalOrders: 4,
      totalSpent: "Rs. 54,750.00",
      joinDate: "Apr 12, 2022",
      address: "202 Green Park, Hyderabad, Telangana, 500001",
      orders: [
        { id: 1038, date: "May 2, 2023", status: "completed", total: "Rs. 22,750.00" },
        { id: 1020, date: "Apr 12, 2023", status: "completed", total: "Rs. 32,000.00" },
      ],
    },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer)
  }

  const closeModal = () => {
    setSelectedCustomer(null)
  }

  const handleOrderClick = (orderId) => {
    // In a real app, you would navigate to the order details page
    console.log(`Navigating to order #${orderId}`)
  }

  return (
    <PageContainer>
      <AdminNavbar activeTab="customers" />
      <Section>
        <PageTitle>
          <User size={24} /> Customers
        </PageTitle>

        <SearchBar>
          <SearchIcon>
            <Search size={18} />
          </SearchIcon>
          <SearchInput
            placeholder="Search customers by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <CustomersTable>
          <TableHeader>
            <div>Customer</div>
            <div>Orders</div>
            <div>Total Spent</div>
            <div>Join Date</div>
          </TableHeader>

          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <TableRow key={customer.id} onClick={() => handleCustomerClick(customer)}>
                <CustomerCell label="Customer">
                  <CustomerAvatar>
                    <User size={16} />
                  </CustomerAvatar>
                  {customer.name}
                </CustomerCell>
                <TableCell label="Orders">{customer.totalOrders}</TableCell>
                <TableCell label="Total Spent">{customer.totalSpent}</TableCell>
                <TableCell label="Join Date">{customer.joinDate}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell style={{ gridColumn: "1 / -1", textAlign: "center" }}>No customers found</TableCell>
            </TableRow>
          )}
        </CustomersTable>
      </Section>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <User size={20} /> {selectedCustomer.name}
              </ModalTitle>
              <CloseButton onClick={closeModal}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <CustomerInfoGrid>
                <InfoCard>
                  <InfoTitle>
                    <User size={16} /> Contact Information
                  </InfoTitle>
                  <InfoRow>
                    <InfoLabel>Email</InfoLabel>
                    <InfoValue>{selectedCustomer.email}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Phone</InfoLabel>
                    <InfoValue>{selectedCustomer.phone}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Address</InfoLabel>
                    <InfoValue>{selectedCustomer.address}</InfoValue>
                  </InfoRow>
                </InfoCard>

                <InfoCard>
                  <InfoTitle>
                    <ShoppingBag size={16} /> Customer Summary
                  </InfoTitle>
                  <InfoRow>
                    <InfoLabel>Total Orders</InfoLabel>
                    <InfoValue>{selectedCustomer.totalOrders}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Total Spent</InfoLabel>
                    <InfoValue>{selectedCustomer.totalSpent}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Join Date</InfoLabel>
                    <InfoValue>{selectedCustomer.joinDate}</InfoValue>
                  </InfoRow>
                </InfoCard>
              </CustomerInfoGrid>

              <SectionTitle>
                <Package size={18} /> Order History
              </SectionTitle>

              <OrdersTable>
                <OrderTableHeader>
                  <div>Order ID</div>
                  <div>Date</div>
                  <div>Status</div>
                  <div>Total</div>
                </OrderTableHeader>

                {selectedCustomer.orders.length > 0 ? (
                  selectedCustomer.orders.map((order) => (
                    <OrderTableRow key={order.id} onClick={() => handleOrderClick(order.id)}>
                      <OrderCell label="Order ID">#{order.id}</OrderCell>
                      <OrderCell label="Date">{order.date}</OrderCell>
                      <OrderCell label="Status">
                        <StatusBadge status={order.status}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </StatusBadge>
                      </OrderCell>
                      <OrderCell label="Total">{order.total}</OrderCell>
                    </OrderTableRow>
                  ))
                ) : (
                  <EmptyState>No orders found for this customer</EmptyState>
                )}
              </OrdersTable>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  )
}

export default AdminCustomers
