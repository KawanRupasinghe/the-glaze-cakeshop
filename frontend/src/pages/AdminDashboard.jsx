"use client"

import { Package, PieChart, Users } from "lucide-react"
import styled from "styled-components"
import { AdminNavbar } from "../components/AdminNavbar"
import { useEffect, useState } from "react"
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled.div`
  background-color: ${(props) => (props.type === "revenue" ? "#f0efe6" : "#fffaf4")};
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(102, 90, 56, 0.1);
  text-align: center;
  border-left: 8px solid ${(props) => (props.type === "revenue" ? "#8B8055" : "#665A38")};
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`

const StatTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: #665A38;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const StatValue = styled.p`
  font-size: 30px;
  color: #8B8055;
  font-weight: bold;
`

const OrdersSection = styled.div`
  margin-top: 20px;
`

const SectionTitle = styled.h2`
  color: #665A38;
  margin-bottom: 16px;
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

const OrderId = styled(TableCell)`
  font-weight: 600;
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
      case "Pending":
        return "#FFF4E5"
      case "Processing":
        return "#E5F6FF"
      case "Completed":
        return "#E7F7EE"
      case "Cancelled":
        return "#FFEBEE"
      default:
        return "#F0EFE6"
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "Pending":
        return "#E67E22"
      case "Processing":
        return "#3498DB"
      case "Completed":
        return "#27AE60"
      case "Cancelled":
        return "#E53935"
      default:
        return "#8B8055"
    }
  }};
`

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #8B8055;
`

const AdminDashboard = () => {
  const [orders, setOrders] = useState([])
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders
        const ordersResponse = await fetch(`${API_BASE_URL}/order/all`)
        const ordersData = await ordersResponse.json()
        setOrders(ordersData)

        // Fetch total customers
        const customersResponse = await fetch(`${API_BASE_URL}/api/customer/get`)
        const customersData = await customersResponse.json()
        setTotalCustomers(customersData)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Calculate total revenue (sum of totalPrice)
  const totalRevenue = orders
      .reduce((sum, order) => sum + parseFloat(order.totalPrice), 0)
      .toFixed(2)

  // Filter pending orders
  const pendingOrders = orders.filter((order) => order.orderStatus === "Pending")


  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`)
    // In a real Next.js app, use: router.push(path)
  }

  return (
      <PageContainer>
        <AdminNavbar />
        <Section>
          <PageTitle>Dashboard</PageTitle>

          <StatsGrid>
            <StatCard type="orders" onClick={() => handleNavigation("/admin/orders")}>
              <StatTitle>
                <Package size={20} /> Pending Orders
              </StatTitle>
              <StatValue>{pendingOrders.length}</StatValue>
            </StatCard>

            <StatCard type="revenue" onClick={() => handleNavigation("/admin/sales")}>
              <StatTitle>
                <PieChart size={20} /> Total Revenue
              </StatTitle>
              <StatValue>Rs. {totalRevenue}</StatValue>
            </StatCard>

            <StatCard type="orders" onClick={() => handleNavigation("/admin/customers")}>
              <StatTitle>
                <Users size={20} /> Total Customers
              </StatTitle>
              <StatValue>{totalCustomers}</StatValue>
            </StatCard>
          </StatsGrid>

          <OrdersSection>
            <SectionTitle>Recent Orders</SectionTitle>

            <OrdersTable>
              <TableHeader>
                <div>Order ID</div>
                <div>Customer</div>
                <div>Status</div>
                <div>Total</div>
              </TableHeader>

              {loading ? (
                  <EmptyState>Loading orders...</EmptyState>
              ) : pendingOrders.length > 0 ? (
                  pendingOrders.map((order) => (
                      <TableRow
                          key={order.orderId}
                          onClick={() => handleNavigation(`/admin/orders/${order.orderId}`)}
                      >
                        <OrderId label="Order ID">{order.orderReference}</OrderId>
                        <TableCell label="Customer">{`${order.firstName} ${order.lastName}`}</TableCell>
                        <TableCell label="Status">
                          <StatusBadge status={order.orderStatus}>
                            {order.orderStatus}
                          </StatusBadge>
                        </TableCell>
                        <TableCell label="Total">Rs. {order.totalPrice}</TableCell>
                      </TableRow>
                  ))
              ) : (
                  <EmptyState>No pending orders found</EmptyState>
              )}
            </OrdersTable>
          </OrdersSection>
        </Section>
      </PageContainer>
  )
}

export default AdminDashboard