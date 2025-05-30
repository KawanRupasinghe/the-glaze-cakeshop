"use client";

import { Plus, Search, Truck, X } from "lucide-react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { AdminNavbar } from "../components/AdminNavbar";
import API_BASE_URL from "../config.jsx";

// ========== Styled Components ==========

const PageContainer = styled.div`
  background: #eeeeee;
  min-height: 100vh;
  padding-top: 130px;
`;

const Section = styled.div`
  padding: 40px 80px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  color: #665a38;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AddButton = styled.button`
  background: #665a38;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;

  &:hover {
    background: #554b2f;
  }
`;

const SearchBar = styled.div`
  position: relative;
  max-width: 400px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 42px;
  border-radius: 8px;
  border: 1px solid #e0dfd6;
  background: #fff;
  color: #665a38;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #8b8055;
  }

  &::placeholder {
    color: #a9a28c;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #8b8055;
`;

const TableWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(102, 90, 56, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  padding: 16px 24px;
  background: #f0efe6;
  color: #665a38;
  font-weight: 600;
  font-size: 14px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  padding: 16px 24px;
  border-bottom: 1px solid #f0efe6;
  align-items: center;

  &:hover {
    background: #fdfcf7;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: block;
    padding: 16px;
  }
`;

const TableCell = styled.div`
  color: #665a38;
  font-size: 14px;

  @media (max-width: 768px) {
    display: flex;
    padding: 4px 0;

    &::before {
      content: attr(data-label);
      font-weight: 600;
      width: 100px;
      margin-right: 16px;
    }
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
  color: #665a38;
  font-size: 14px;
`;

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
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0efe6;
`;

const ModalTitle = styled.h2`
  color: #665a38;
  font-size: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #8b8055;
  cursor: pointer;

  &:hover {
    color: #665a38;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #665a38;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e0dfd6;
  background: #fff;
  color: #665a38;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #8b8055;
  }
`;

const SubmitButton = styled.button`
  background: #665a38;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    background: #554b2f;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 14px;
  margin-top: 10px;
`;

// ========== Main Component ==========

const AdminDeliveries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [newDelivery, setNewDelivery] = useState({
    customerName: "",
    customerAddress: "",
    productDescription: "",
    totalPrice: "",
    paymentMethod: "",
    deliveryReference: "",
    deliveryStatus: "Pending",
    orderId: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch all deliveries on component mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/delivery/all`)
        .then((response) => response.json())
        .then((data) => {
          const formattedDeliveries = data.map((delivery) => ({
            id: delivery.deliveryId,
            customer: delivery.customerName,
            total: `Rs. ${parseFloat(delivery.totalPrice).toFixed(2)}`,
            date: new Date(delivery.createdAt || Date.now()).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
            ),
            status: delivery.deliveryStatus,
            customerAddress: delivery.customerAddress,
            productDescription: delivery.productDescription,
            paymentMethod: delivery.paymentMethod,
            deliveryReference: delivery.deliveryReference,
            orderId: delivery.orderId,
          }));
          setDeliveries(formattedDeliveries);
        })
        .catch((error) => console.error("Error fetching deliveries:", error));
  }, []);

  // Fetch completed orders when modal opens
  useEffect(() => {
    if (isModalOpen) {
      fetch(`${API_BASE_URL}/order/all`)
          .then((response) => response.json())
          .then((data) => {
            const completed = data.filter(
                (order) => order.orderStatus === "COMPLETED"
            );
            setCompletedOrders(completed);
          })
          .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [isModalOpen]);

  // Update form when an order is selected
  const handleOrderSelect = (orderId) => {
    const order = completedOrders.find((o) => o.orderId === parseInt(orderId));
    setSelectedOrder(order);
    if (order) {
      setNewDelivery({
        customerName: `${order.firstName} ${order.lastName}`,
        customerAddress: `${order.address}, ${order.city}, ${order.state}, ${order.postalCode}`,
        productDescription: order.productDescription,
        totalPrice: order.totalPrice,
        paymentMethod: order.paymentMethod,
        deliveryReference: order.orderReference,
        deliveryStatus: "Pending",
        orderId: order.orderId,
      });
    }
  };

  const filteredDeliveries = deliveries.filter(
      (delivery) =>
          delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(delivery.id).includes(searchTerm)
  );

  const handleStatusChange = async (id, newStatus) => {
    try {
      const deliveryToUpdate = deliveries.find((d) => d.id === id);
      if (!deliveryToUpdate) {
        console.error("Delivery not found");
        return;
      }

      const payload = {
        deliveryId: id,
        customerName: deliveryToUpdate.customer,
        customerAddress: deliveryToUpdate.customerAddress || "",
        productDescription: deliveryToUpdate.productDescription || "",
        totalPrice: deliveryToUpdate.total.replace("Rs. ", ""),
        paymentMethod: deliveryToUpdate.paymentMethod || "",
        deliveryReference: deliveryToUpdate.deliveryReference || "",
        deliveryStatus: newStatus,
        orderId: deliveryToUpdate.orderId || null,
      };

      console.log("Updating delivery with payload:", payload); // Debug payload

      const response = await fetch(`${API_BASE_URL}/delivery/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedDeliveries = deliveries.map((d) =>
            d.id === id ? { ...d, status: newStatus } : d
        );
        setDeliveries(updatedDeliveries);
      } else {
        const errorData = await response.json();
        console.error("Failed to update delivery status:", errorData);
      }
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  const handleAddDelivery = async () => {
    // Validate required fields
    if (
        !newDelivery.customerName ||
        !newDelivery.customerAddress ||
        !newDelivery.productDescription ||
        !newDelivery.totalPrice ||
        !newDelivery.paymentMethod ||
        !newDelivery.deliveryReference ||
        !newDelivery.orderId
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      setErrorMessage("");
      const payload = {
        customerName: newDelivery.customerName,
        customerAddress: newDelivery.customerAddress,
        productDescription: newDelivery.productDescription,
        totalPrice: newDelivery.totalPrice,
        paymentMethod: newDelivery.paymentMethod,
        deliveryReference: newDelivery.deliveryReference,
        deliveryStatus: newDelivery.deliveryStatus,
        orderId: newDelivery.orderId,
      };

      console.log("Sending payload:", payload); // Debug payload

      const response = await fetch(`${API_BASE_URL}/delivery/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const savedDelivery = await response.json();
        setDeliveries([
          ...deliveries,
          {
            id: savedDelivery.deliveryId,
            customer: newDelivery.customerName,
            total: `Rs. ${parseFloat(newDelivery.totalPrice).toFixed(2)}`,
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            status: newDelivery.deliveryStatus,
            customerAddress: newDelivery.customerAddress,
            productDescription: newDelivery.productDescription,
            paymentMethod: newDelivery.paymentMethod,
            deliveryReference: newDelivery.deliveryReference,
            orderId: newDelivery.orderId,
          },
        ]);
        setNewDelivery({
          customerName: "",
          customerAddress: "",
          productDescription: "",
          totalPrice: "",
          paymentMethod: "",
          deliveryReference: "",
          deliveryStatus: "Pending",
          orderId: null,
        });
        setSelectedOrder(null);
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        setErrorMessage(
            errorData.message || "Failed to save delivery. Please try again."
        );
      }
    } catch (error) {
      console.error("Error saving delivery:", error);
      setErrorMessage("An error occurred while saving the delivery.");
    }
  };

  return (
      <PageContainer>
        <AdminNavbar activeTab="orders" />
        <Section>
          <HeaderRow>
            <PageTitle>
              <Truck size={24} /> Deliveries
            </PageTitle>
            <AddButton onClick={() => setIsModalOpen(true)}>
              <Plus size={18} /> Add New Delivery
            </AddButton>
          </HeaderRow>

          <SearchBar>
            <SearchIcon>
              <Search size={18} />
            </SearchIcon>
            <SearchInput
                placeholder="Search delivery by ID or Customer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>

          <TableWrapper>
            <TableHeader>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableHeader>

            {filteredDeliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell>{delivery.id}</TableCell>
                  <TableCell>{delivery.customer}</TableCell>
                  <TableCell>{delivery.total}</TableCell>
                  <TableCell>{delivery.date}</TableCell>
                  <TableCell>
                    <FormSelect
                        value={delivery.status}
                        onChange={(e) =>
                            handleStatusChange(delivery.id, e.target.value)
                        }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Delayed">Delayed</option>
                    </FormSelect>
                  </TableCell>
                </TableRow>
            ))}
          </TableWrapper>

          {isModalOpen && (
              <ModalOverlay>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Add New Delivery</ModalTitle>
                    <CloseButton onClick={() => setIsModalOpen(false)}>
                      <X size={20} />
                    </CloseButton>
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <FormLabel>Select Completed Order</FormLabel>
                      <FormSelect
                          value={selectedOrder?.orderId || ""}
                          onChange={(e) => handleOrderSelect(e.target.value)}
                      >
                        <option value="">Select an order</option>
                        {completedOrders.map((order) => (
                            <option key={order.orderId} value={order.orderId}>
                              {order.orderReference} - {order.firstName}{" "}
                              {order.lastName}
                            </option>
                        ))}
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Customer Name</FormLabel>
                      <FormInput
                          type="text"
                          value={newDelivery.customerName}
                          onChange={(e) =>
                              setNewDelivery({
                                ...newDelivery,
                                customerName: e.target.value,
                              })
                          }
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Customer Address</FormLabel>
                      <FormInput
                          type="text"
                          value={newDelivery.customerAddress}
                          onChange={(e) =>
                              setNewDelivery({
                                ...newDelivery,
                                customerAddress: e.target.value,
                              })
                          }
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Product Description</FormLabel>
                      <FormInput
                          type="text"
                          value={newDelivery.productDescription}
                          onChange={(e) =>
                              setNewDelivery({
                                ...newDelivery,
                                productDescription: e.target.value,
                              })
                          }
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Total Price</FormLabel>
                      <FormInput
                          type="text"
                          value={newDelivery.totalPrice}
                          onChange={(e) =>
                              setNewDelivery({
                                ...newDelivery,
                                totalPrice: e.target.value,
                              })
                          }
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Payment Method</FormLabel>
                      <FormInput
                          type="text"
                          value={newDelivery.paymentMethod}
                          onChange={(e) =>
                              setNewDelivery({
                                ...newDelivery,
                                paymentMethod: e.target.value,
                              })
                          }
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Delivery Reference</FormLabel>
                      <FormInput
                          type="text"
                          value={newDelivery.deliveryReference}
                          onChange={(e) =>
                              setNewDelivery({
                                ...newDelivery,
                                deliveryReference: e.target.value,
                              })
                          }
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>Delivery Status</FormLabel>
                      <FormSelect
                          value={newDelivery.deliveryStatus}
                          onChange={(e) =>
                              setNewDelivery({
                                ...newDelivery,
                                deliveryStatus: e.target.value,
                              })
                          }
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Delayed">Delayed</option>
                      </FormSelect>
                    </FormGroup>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <SubmitButton onClick={handleAddDelivery}>
                      Save Delivery
                    </SubmitButton>
                  </ModalBody>
                </ModalContent>
              </ModalOverlay>
          )}
        </Section>
      </PageContainer>
  );
};

export default AdminDeliveries;