"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { AdminNavbar } from "../components/AdminNavbar"
import { ChevronRight, Package, Search, User } from 'lucide-react'
import API_BASE_URL from "../config.jsx";

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

const OrdersTable = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(102, 90, 56, 0.1);
  overflow: hidden;
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
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
  grid-template-columns: 1fr 2fr 1fr 1fr;
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
    padding-right: 50px;
  }
`

const TableCell = styled.div`
  color: #665A38;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 6px 0;
    display: flex;

    &:before {
      content: "${(props) => props.label}";
      width: 120px;
      font-weight: 600;
      margin-right: 16px;
    }
  }
`

const OrderId = styled(TableCell)`
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const OrderReference = styled.span`
  font-size: 12px;
  color: #8B8055;
  font-weight: normal;
`

const CustomerCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: 10px;
`

const CustomerAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0efe6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8B8055;
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

// Order Detail Modal
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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`

const ModalHeader = styled.div`
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

const ModalSubtitle = styled.span`
  font-size: 14px;
  color: #8B8055;
  font-weight: normal;
`

const ModalBody = styled.div`
  padding: 20px;
`

const OrderItemsTable = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const ItemsTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0efe6;

  &:last-child {
    border-bottom: none;
  }
`

const ItemName = styled.div`
  color: #665A38;
  font-weight: 500;
`

const ItemDetails = styled.div`
  color: #8B8055;
  font-size: 14px;
`

const OrderSummary = styled.div`
  background: #f9f8f3;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
    padding-top: 8px;
    border-top: 1px solid #e0dfd6;
    font-weight: 600;
  }
`

const SummaryLabel = styled.span`
  color: #8B8055;
`

const SummaryValue = styled.span`
  color: #665A38;
  font-weight: 500;
`

const CustomerInfo = styled.div`
  margin-bottom: 20px;
`

const InfoTitle = styled.div`
  font-weight: 600;
  color: #665A38;
  margin-bottom: 8px;
`

const InfoText = styled.div`
  color: #8B8055;
  font-size: 14px;
  line-height: 1.5;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`

const Button = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${props => props.primary ? "#665A38" : "#fff"};
  color: ${props => props.primary ? "#fff" : "#665A38"};
  border: 1px solid ${props => props.primary ? "#665A38" : "#e0dfd6"};

  &:hover {
    background: ${props => props.primary ? "#554b2f" : "#f9f8f3"};
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #8B8055;
`

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/order/all`)
        const data = await response.json()
        // Transform and sort backend data
        const transformedOrders = data
            .map(order => ({
              id: order.orderId,
              orderReference: order.orderReference,
              customer: `${order.firstName} ${order.lastName}`,
              status: order.orderStatus.toLowerCase(), // Normalize for StatusBadge
              total: `Rs. ${parseFloat(order.totalPrice).toFixed(2)}`,
              items: [
                {
                  name: order.productDescription.split(" x ")[0], // Extract product name
                  quantity: parseInt(order.productDescription.match(/x (\d+)/)[1]), // Extract quantity
                  price: `Rs. ${parseFloat(order.productDescription.match(/Rs\. ([\d.]+)/)[1]).toFixed(2)}`
                }
              ],
              subtotal: `Rs. ${parseFloat(order.totalPrice).toFixed(2)}`,
              tax: `Rs. ${(parseFloat(order.totalPrice) * 0.05).toFixed(2)}`, // Assume 5% tax
              shipping: `Rs. 250.00`, // Assume fixed shipping
              total_amount: `Rs. ${(parseFloat(order.totalPrice) + parseFloat(order.totalPrice) * 0.05 + 250).toFixed(2)}`,
              address: `${order.address}, ${order.city}, ${order.state}, ${order.postalCode}`,
              phone: order.phoneNumber,
              orderDate: order.orderDate // Store for sorting
            }))
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) // Sort by orderDate descending
        setOrders(transformedOrders)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching orders:", error)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const filteredOrders = orders.filter(order =>
      order.id.toString().includes(searchTerm) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderReference.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOrderClick = (order) => {
    console.log(`Clicked order #${order.id}`) // Debug log
    setSelectedOrder(order)
  }

  const closeModal = () => {
    setSelectedOrder(null)
  }

  const updateOrderStatus = async (status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/order/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          orderStatus: status.toUpperCase(), // Backend may expect uppercase status
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Update the local orders state to reflect the new status
      setOrders((prevOrders) =>
          prevOrders.map((order) =>
              order.id === selectedOrder.id ? { ...order, status } : order
          )
      );

      // Update the selected order to reflect the new status
      setSelectedOrder((prev) => ({ ...prev, status }));

      console.log(`Order #${selectedOrder.id} status updated to ${status}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      // Optionally, show a user-friendly error message (e.g., using a toast notification)
      alert("Failed to update order status. Please try again.");
    }
  };

  return (
      <PageContainer>
        <AdminNavbar activeTab="orders" />
        <Section>
          <PageTitle>
            <Package size={24} /> Orders
          </PageTitle>

          <SearchBar>
            <SearchIcon>
              <Search size={18} />
            </SearchIcon>
            <SearchInput
                placeholder="Search orders by ID, reference, or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>

          <OrdersTable>
            <TableHeader>
              <div>Order ID</div>
              <div>Customer</div>
              <div>Status</div>
              <div>Total</div>
            </TableHeader>

            {loading ? (
                <EmptyState>Loading orders...</EmptyState>
            ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <TableRow key={order.id} onClick={() => handleOrderClick(order)}>
                      <OrderId label="Order ID">
                        #{order.id}
                        <OrderReference>Ref: {order.orderReference}</OrderReference>
                      </OrderId>
                      <CustomerCell label="Customer">
                        <CustomerAvatar>
                          <User size={16} />
                        </CustomerAvatar>
                        {order.customer}
                      </CustomerCell>
                      <TableCell label="Status">
                        <StatusBadge status={order.status}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell label="Total">{order.total}</TableCell>
                    </TableRow>
                ))
            ) : (
                <EmptyState>No orders found</EmptyState>
            )}
          </OrdersTable>
        </Section>

        {selectedOrder && (
            <ModalOverlay onClick={closeModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>
                    <Package size={20} /> Order #{selectedOrder.id} <ModalSubtitle>(Ref: {selectedOrder.orderReference})</ModalSubtitle>
                  </ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <CustomerInfo>
                    <InfoTitle>Customer Information</InfoTitle>
                    <InfoText>
                      {selectedOrder.customer}<br />
                      {selectedOrder.phone}<br />
                      {selectedOrder.address}
                    </InfoText>
                  </CustomerInfo>

                  <InfoTitle>Order Items</InfoTitle>
                  <OrderItemsTable>
                    {selectedOrder.items.map((item, index) => (
                        <ItemsTableRow key={index}>
                          <ItemName>{item.name} × {item.quantity}</ItemName>
                          <ItemDetails>{item.price}</ItemDetails>
                        </ItemsTableRow>
                    ))}
                  </OrderItemsTable>

                  <OrderSummary>
                    <SummaryRow>
                      <SummaryLabel>Subtotal</SummaryLabel>
                      <SummaryValue>{selectedOrder.subtotal}</SummaryValue>
                    </SummaryRow>
                    <SummaryRow>
                      <SummaryLabel>Tax</SummaryLabel>
                      <SummaryValue>{selectedOrder.tax}</SummaryValue>
                    </SummaryRow>
                    <SummaryRow>
                      <SummaryLabel>Shipping</SummaryLabel>
                      <SummaryValue>{selectedOrder.shipping}</SummaryValue>
                    </SummaryRow>
                    <SummaryRow>
                      <SummaryLabel>Total</SummaryLabel>
                      <SummaryValue>{selectedOrder.total_amount}</SummaryValue>
                    </SummaryRow>
                  </OrderSummary>

                  <InfoTitle>Current Status</InfoTitle>
                  <StatusBadge status={selectedOrder.status} style={{ marginBottom: "20px" }}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </StatusBadge>

                  <ButtonGroup>
                    {selectedOrder.status === "pending" && (
                        <Button primary onClick={() => updateOrderStatus("processing")}>
                          Start Processing
                        </Button>
                    )}
                    {selectedOrder.status === "processing" && (
                        <Button primary onClick={() => updateOrderStatus("completed")}>
                          Mark as Completed
                        </Button>
                    )}
                    {(selectedOrder.status === "pending" || selectedOrder.status === "processing") && (
                        <Button onClick={() => updateOrderStatus("cancelled")}>
                          Cancel Order
                        </Button>
                    )}
                    <Button onClick={closeModal}>
                      Close
                    </Button>
                  </ButtonGroup>
                </ModalBody>
              </ModalContent>
            </ModalOverlay>
        )}
      </PageContainer>
  )
}

export default AdminOrders