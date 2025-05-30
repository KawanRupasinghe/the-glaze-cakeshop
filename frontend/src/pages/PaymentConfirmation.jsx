"use client";
import { ArrowRight, CheckCircle, Clock, Download, Home, Package } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import API_BASE_URL from "../config.jsx";

// Styled Components (Existing styles remain unchanged, adding new ones for the modal)
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
`;

const PageTitle = styled.h1`
  font-family: 'Inter', serif;
  font-size: 60px;
  font-weight: 200;
  color: #665A38;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: #000;
  }
`;

const ConfirmationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #665A38;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: rgba(102, 90, 56, 0.1);
  border-radius: 12px;
`;

const SuccessIcon = styled.div`
  color: #665A38;
  margin-right: 1rem;
`;

const SuccessText = styled.div`
  flex: 1;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #665A38;
  }

  p {
    color: #555;
    margin: 0;
  }
`;

const OrderInfo = styled.div`
  margin-bottom: 2rem;
`;

const OrderNumber = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const OrderDate = styled.div`
  color: #555;
  margin-bottom: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.div`
  color: #555;
  font-weight: 500;
`;

const InfoValue = styled.div`
  font-weight: 500;
  text-align: right;
`;

const AddressBox = styled.div`
  margin-top: 1rem;
  line-height: 1.6;
`;

const ProductList = styled.div`
  margin-top: 1rem;
`;

const ProductItem = styled.div`
  display: flex;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ProductPrice = styled.div`
  font-weight: 500;
  color: #665A38;
`;

const ProductQuantity = styled.div`
  color: #555;
  font-size: 0.875rem;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #665A38;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #7d6c43;
  }

  svg {
    margin-left: 0.5rem;
  }
`;

const SecondaryButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: white;
  color: #665A38;
  border: 1px solid #665A38;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(102, 90, 56, 0.05);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const TrackingInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const TrackingIcon = styled.div`
  color: #665A38;
  margin-right: 1rem;
`;

const TrackingText = styled.div`
  flex: 1;

  p {
    margin: 0;
    color: #555;
  }

  strong {
    color: #000;
  }
`;

// New Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow: auto;
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #665A38;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 1rem;
`;

const PdfPreview = styled.iframe`
  width: 100%;
  height: 500px;
  border: none;
`;

const PaymentConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderId = localStorage.getItem("orderId");
        const response = await fetch(`${API_BASE_URL}/order/get?orderId=${orderId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();

        // Transform API data to match the component's expected structure
        const transformedData = {
          orderNumber: data.orderReference || "Unknown",
          orderDate: new Date(data.orderDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          paymentMethod: data.paymentMethod || "Unknown",
          orderStatus: data.orderStatus || "Unknown",
          items: [
            {
              id: 1,
              name: data.productDescription.split(" - ")[0], // Extract product name
              price: parseFloat(data.totalPrice) / 2, // Adjust based on your logic
              quantity: 2, // Extract from productDescription if needed
            },
          ],
          subtotal: parseFloat(data.totalPrice) - 350, // Adjust based on your logic
          deliveryFee: 250, // Static or from API if available
          tax: 100, // Static or from API if available
          total: parseFloat(data.totalPrice),
          customer: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phoneNumber,
            address: data.address,
            city: data.city,
            state: data.state,
            postalcode: data.postalCode,
          },
          estimatedDelivery: "April 30-May 2, 2025", // Static or from API if available
        };

        setOrderDetails(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleDownloadReceipt = async (download = false) => {
    try {
      // Transform orderDetails to match the OrderDto structure expected by the backend
      const orderDto = {
        orderReference: orderDetails.orderNumber,
        orderDate: new Date(orderDetails.orderDate).toISOString(),
        paymentMethod: orderDetails.paymentMethod,
        orderStatus: orderDetails.orderStatus,
        totalPrice: orderDetails.total.toString(),
        productDescription: orderDetails.items.map(item => `${item.name} - Qty: ${item.quantity}`).join(", "),
        firstName: orderDetails.customer.name.split(" ")[0],
        lastName: orderDetails.customer.name.split(" ")[1] || "",
        email: orderDetails.customer.email,
        phoneNumber: orderDetails.customer.phone,
        address: orderDetails.customer.address,
        city: orderDetails.customer.city,
        state: orderDetails.customer.state,
        postalCode: orderDetails.customer.postalcode,
      };

      const response = await fetch(`${API_BASE_URL}/order/generate-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDto),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      if (download) {
        // Trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = `order-${orderDetails.orderNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        // Show preview
        setPdfUrl(url);
        setShowPreview(true);
      }
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate receipt. Please try again.");
    }
  };

  const handleContinueShopping = () => {
    window.location.href = "/dashboard";
  };

  const closePreview = () => {
    if (pdfUrl) {
      window.URL.revokeObjectURL(pdfUrl);
    }
    setPdfUrl(null);
    setShowPreview(false);
  };

  // Handle loading and error states
  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }

  // Ensure orderDetails is defined before rendering
  if (!orderDetails) {
    return <Container>Loading order details...</Container>;
  }

  return (
      <Container>
        <PageTitle>Order Confirmation</PageTitle>

        <SuccessMessage>
          <SuccessIcon>
            <CheckCircle size={32} />
          </SuccessIcon>
          <SuccessText>
            <h3>Thank you for your order!</h3>
            <p>Your order has been placed successfully.</p>
          </SuccessText>
        </SuccessMessage>

        <ConfirmationGrid>
          <div>
            <Section>
              <SectionTitle>Order Summary</SectionTitle>
              <OrderInfo>
                <OrderNumber>Order #{orderDetails.orderNumber}</OrderNumber>
                <OrderDate>Placed on {orderDetails.orderDate}</OrderDate>

                <InfoRow>
                  <InfoLabel>Payment Method</InfoLabel>
                  <InfoValue>{orderDetails.paymentMethod}</InfoValue>
                </InfoRow>

                <InfoRow>
                  <InfoLabel>Estimated Delivery</InfoLabel>
                  <InfoValue>{orderDetails.estimatedDelivery}</InfoValue>
                </InfoRow>
              </OrderInfo>

              <TrackingInfo>
                <TrackingIcon>
                  <Clock size={24} />
                </TrackingIcon>
                <TrackingText>
                  <p>
                    Your order is being <strong>{orderDetails.orderStatus.toLowerCase()}</strong>. You will receive an email
                    with tracking information once your order ships.
                  </p>
                </TrackingText>
              </TrackingInfo>
            </Section>

            <Section>
              <SectionTitle>Shipping Address</SectionTitle>
              <AddressBox>
                <div>
                  <strong>{orderDetails.customer.name}</strong>
                </div>
                <div>{orderDetails.customer.address}</div>
                <div>
                  {orderDetails.customer.city}, {orderDetails.customer.state} {orderDetails.customer.postalcode}
                </div>
                <div>{orderDetails.customer.phone}</div>
                <div>{orderDetails.customer.email}</div>
              </AddressBox>
            </Section>

            <div>
              <Button onClick={handleContinueShopping}>
                Continue Shopping <ArrowRight size={18} />
              </Button>
              <SecondaryButton onClick={() => handleDownloadReceipt(false)}>
                <Download size={18} /> Preview Receipt
              </SecondaryButton>
            </div>
          </div>

          <div>
            <Section>
              <SectionTitle>Order Details</SectionTitle>
              <ProductList>
                {orderDetails.items.map((item) => (
                    <ProductItem key={item.id}>
                      <ProductDetails>
                        <ProductName>{item.name}</ProductName>
                        <ProductPrice>Rs. {item.price.toLocaleString()}</ProductPrice>
                        <ProductQuantity>Quantity: {item.quantity}</ProductQuantity>
                      </ProductDetails>
                    </ProductItem>
                ))}
              </ProductList>

              <InfoRow>
                <InfoLabel>Subtotal</InfoLabel>
                <InfoValue>Rs. {orderDetails.subtotal.toLocaleString()}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Delivery Fee</InfoLabel>
                <InfoValue>Rs. {orderDetails.deliveryFee.toLocaleString()}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Tax</InfoLabel>
                <InfoValue>Rs. {orderDetails.tax.toLocaleString()}</InfoValue>
              </InfoRow>

              <TotalRow>
                <InfoLabel>Total</InfoLabel>
                <InfoValue>Rs. {orderDetails.total.toLocaleString()}</InfoValue>
              </TotalRow>
            </Section>

            <Section>
              <SectionTitle>What's Next?</SectionTitle>
              <InfoRow>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: "1rem", color: "#665A38" }}>
                    <Package size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "500", marginBottom: "0.25rem" }}>Processing Your Order</div>
                    <div style={{ color: "#555", fontSize: "0.9rem" }}>We're preparing your items for shipment.</div>
                  </div>
                </div>
              </InfoRow>

              <InfoRow>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: "1rem", color: "#665A38" }}>
                    <Home size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "500", marginBottom: "0.25rem" }}>Delivery</div>
                    <div style={{ color: "#555", fontSize: "0.9rem" }}>
                      Expected delivery: {orderDetails.estimatedDelivery}
                    </div>
                  </div>
                </div>
              </InfoRow>
            </Section>
          </div>
        </ConfirmationGrid>

        {showPreview && (
            <ModalOverlay>
              <ModalContent>
                <ModalCloseButton onClick={closePreview}>&times;</ModalCloseButton>
                <PdfPreview src={pdfUrl} />
                <ModalActions>
                  <Button onClick={() => handleDownloadReceipt(true)}>Download Receipt</Button>
                  <SecondaryButton onClick={closePreview}>Close</SecondaryButton>
                </ModalActions>
              </ModalContent>
            </ModalOverlay>
        )}
      </Container>
  );
};

export default PaymentConfirmation;